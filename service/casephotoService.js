'use strict';

var casephotoModule = require(rootPath.concat("/module/casephotoModule.js"));

exports.select = (req,res,next) => {
    let conn;
    Promise.coroutine(function* () {
        conn = yield util.getConnect();
        let result = yield casephotoModule.select(conn,req.query);
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
        let result = yield casephotoModule.get(conn,{id:req.params.id});
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
        yield casephotoModule.add(conn,{cid:req.body.cid,imgurl:req.file.filename});
        return res.json(config.message.success);
    })().catch(( err )=> {
        console.log(err.stack);
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
        yield casephotoModule.update(conn,req.body);
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
        yield casephotoModule.delete(conn,req.params);
        return res.json(config.message.success);
    })().catch(( err )=> {
        console.log(err);
        return res.json(config.message.error);
    }).finally(()=> {
        conn.release();
    });
}