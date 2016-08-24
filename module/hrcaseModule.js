'use strict';

exports.select= ( conn,param ) => {
    param.page = param.page || 0;
    param.pagecount = param.pagecount || config.pagecount;

    let sql = `select * from hrcase limit ${param.page * param.pagecount},${param.pagecount}`;
    return conn.queryAsync(sql,param);
}

exports.get = ( conn,param ) => {
    let sql = `select * from hrcase where id = :id`;
    return conn.queryAsync(sql,param);
}

exports.add = ( conn,param ) => {
    let sql = `insert into hrcase values(default,:weparty,:otherparty,:thirdparty,:casesubject,:organizers,:casestatus)`;
    return conn.queryAsync(sql,param).then((result)=> {
        return result.insertId;
    });
}

exports.update = ( conn,param ) => {
    let sql = `update hrcase set weparty = :weparty,otherparty = :otherparty,thirdparty = :thirdparty,casesubject = :casesubject,organizers = :organizers,casestatus = :casestatus where id = :id`;
    return conn.queryAsync(sql,param);
}

exports.delete = ( conn,param ) => {
    let sql = `delete from hrcase where id = :id`;
    return conn.queryAsync(sql,param).then((result) => {
        return result.affectedRows;
    });
}