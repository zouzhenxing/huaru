'use strict';

var expect = require('chai').expect;
var fetch = require("node-fetch");

var rooturl = "http://localhost:8088";
var header = {"Content-type":"application/x-www-form-urlencoded"};
/*
casestatus表的字段

Field:id Type:int(11) Null:NO Key:PRI Default: Extra:auto_increment 

Field:cid Type:int(11) Null:YES Key: Default: Extra: 

Field:status Type:varchar(100) Null:YES Key: Default: Extra: 

Field:info Type:varchar(300) Null:YES Key: Default: Extra: 

Field:date Type:datetime Null:YES Key: Default: Extra: 

*/
describe('casestatus表测试',() => {
    it("增加casestatus测试",() => {
        //请填写增加对象let body = "name=admin@yuanku.org&password=admin";
        let body = "cid=1&status=1&info=测试";
        return fetch(rooturl.concat('/casestatus'),{method:'post',headers:header,body:body}).then(( res )=> {
            return res.json();
        }).then((json)=> {
            console.log(json);
            expect(json).to.be.deep.equal({"code":1,"msg":"操作成功!"});
        });
    });

    it("根据ID获取casestatus",()=> {      
        return fetch(rooturl.concat('/casestatus/1')).then(( res )=> {
            return res.json();
        }).then((json)=> {
            console.log(json);
            expect(json.data).to.not.be.empty;
        });
    });

    it("根据ID修改casestatus",()=> {
        //请填写修改对象let body = "name=update@yuanku.org&password=update";
        let body = "cid=2&status=2&info=测试2";     
        return fetch(rooturl.concat('/casestatus/1'),{method:'put',headers:header,body:body}).then(( res )=> {
            return res.json();
        }).then((json)=> {
            console.log(json);
            expect(json).to.be.deep.equal({"code":1,"msg":"操作成功!"});
        });
    });

    it("根据ID删除casestatus",()=> {   
        return fetch(rooturl.concat('/casestatus/0'),{method:'delete'}).then(( res )=> {
            return res.json();
        }).then((json)=> {
            console.log(json);
            expect(json).to.be.deep.equal({"code":1,"msg":"操作成功!"});
        });
    });

    it("查询casestatus",()=> {   
        return fetch(rooturl.concat('/casestatus')).then(( res )=> {
            return res.json();
        }).then((json)=> {
            console.log(json);
            expect(json).to.not.be.empty;
        });
    });
});