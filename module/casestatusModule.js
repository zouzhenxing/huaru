'use strict';

exports.select= ( conn,param ) => {
    param.page = param.page || 0;
    param.pagecount = param.pagecount || config.pagecount;

    let sql = `select * from casestatus limit ${param.page * param.pagecount},${param.pagecount}`;
    return conn.queryAsync(sql,param);
}

exports.get = ( conn,param ) => {
    let sql = `select * from casestatus where id = :id`;
    return conn.queryAsync(sql,param);
}

exports.add = ( conn,param ) => {
    let sql = `insert into casestatus values(default,:cid,:status,:info,now())`;
    return conn.queryAsync(sql,param).then((result)=> {
        return result.insertId;
    });
}

exports.update = ( conn,param ) => {
    let sql = `update casestatus set cid = :cid,status = :status,info = :info,date = now() where id = :id`;
    return conn.queryAsync(sql,param);
}

exports.delete = ( conn,param ) => {
    let sql = `delete from casestatus where id = :id`;
    return conn.queryAsync(sql,param).then((result) => {
        return result.affectedRows;
    });
}