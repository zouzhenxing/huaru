'use strict';

var casestatusModule = require(rootPath.concat("/module/casestatusModule.js"));

exports.select = (req,res,next) => {
    let conn;
    Promise.coroutine(function* () {
        conn = yield util.getConnect();
        let result = yield casestatusModule.select(conn,req.query);
        return res.json(util.success( {data:result} ));
    })().catch(( err )=> {
        console.log(err);
        return res.json(config.message.error);
    }).finally(()=> {
        conn.release();
    });
}

exports.get = (req,res,next) => {
    let conn;
    Promise.coroutine(function* () {
        conn = yield util.getConnect();
        let result = yield casestatusModule.get(conn,{id:req.params.id});
        return res.json(util.success( {data:result} ));
    })().catch(( err )=> {
        console.log(err);
        return res.json(config.message.error);
    }).finally(()=> {
        conn.release();
    });
}

exports.add = (req,res,next) => {
    let conn;
    Promise.coroutine(function* () {
        conn = yield util.getConnect();
        yield casestatusModule.add(conn,req.body);
        return res.json(config.message.success);
    })().catch(( err )=> {
        console.log(err);
        return res.json(config.message.error);
    }).finally(()=> {
        conn.release();
    });
}

exports.update = (req,res,next) => {
    let conn;
    Promise.coroutine(function* () {
        conn = yield util.getConnect();
        req.body.id = req.params.id;
        yield casestatusModule.update(conn,req.body);
        return res.json(config.message.success);
    })().catch(( err )=> {
        console.log(err);
        return res.json(config.message.error);
    }).finally(()=> {
        conn.release();
    });
}

exports.delete = (req,res,next) => {
    let conn;
    Promise.coroutine(function* () {
        conn = yield util.getConnect();
        yield casestatusModule.delete(conn,req.params);
        return res.json(config.message.success);
    })().catch(( err )=> {
        console.log(err);
        return res.json(config.message.error);
    }).finally(()=> {
        conn.release();
    });
}