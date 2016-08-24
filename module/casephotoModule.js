'use strict';

exports.select= ( conn,param ) => {
    param.page = param.page || 0;
    param.pagecount = param.pagecount || config.pagecount;

    let sql = `select * from casephoto limit ${param.page * param.pagecount},${param.pagecount}`;
    return conn.queryAsync(sql,param);
}

exports.get = ( conn,param ) => {
    let sql = `select * from casephoto where id = :id`;
    return conn.queryAsync(sql,param);
}

exports.add = ( conn,param ) => {
    let sql = `insert into casephoto values(default,:cid,:imgurl)`;
    return conn.queryAsync(sql,param).then((result)=> {
        return result.insertId;
    });
}

exports.update = ( conn,param ) => {
    let sql = `update casephoto set cid = :cid,imgurl = :imgurl where id = :id`;
    return conn.queryAsync(sql,param);
}

exports.delete = ( conn,param ) => {
    let sql = `delete from casephoto where id = :id`;
    return conn.queryAsync(sql,param).then((result) => {
        return result.affectedRows;
    });
}