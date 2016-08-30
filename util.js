/**
 * 全局设置
 */
global.rootPath = __dirname;
global.Promise = require("bluebird");
global.fs = Promise.promisifyAll(require("fs"));

/**
 * 加载配置文件
 */
var loadConfig = () => {
    var data = fs.readFileSync(rootPath.concat("/config.json"));
    return JSON.parse(data.toString());
}
global.config = loadConfig();

/**
 * 连接redis数据库
 */
var ioRedis = require('ioredis');
var redisClient = () => {
    return ioRedis.createClient(6379, '127.0.0.1');
}
// global.redisClient = redisClient();

/**
 * 加载数据库配置文件
 */
var mysql = require("mysql");
Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);
exports.pool = mysql.createPool({
    host     : '120.24.243.130',
    user     : 'root',
    password : 'root',
    database : 'hurun',
    dateStrings : 'DATETIME'
});
/**
 * 获取数据库连接
 */
exports.getConnect = () => {
    return this.pool.getConnectionAsync().then((conn) => {
        conn.config.queryFormat = sqlFormat;
        return conn;
    });
}
/**
 * 自定义sql语句转议
 */
var sqlFormat = function (query, values) {
    if (!values) return query;
    return query.replace(/\:(\w+)/g, function (txt, key) {
        if (values.hasOwnProperty(key)) {
        return this.escape(values[key]);
        }
        return txt;
    }.bind(this));
};

//配置文件上传
var multer = require('multer');
exports.upfile = () => {
    var storage = multer.diskStorage({
        //设置上传后文件路径，uploads文件夹会自动创建。
        destination: function (req, file, cb) {
            cb(null, './public/uploads')
        }, 
        //给上传文件重命名，获取添加后缀名
        filename: function (req, file, cb) {
            var fileFormat = (file.originalname).split(".");
            cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
        }
    });

    return multer({
        storage: storage,
        limits:{}
    });
}

/**
 * 成功返回
 */
exports.success = ( obj ) => {
    return Object.assign(obj,config.message.success);
}

/**
 * 返回失败
 */
exports.fail = ( obj ) => {
    return Object.assign(obj,config.message.error);
}
