'use strict';

var expect = require('chai').expect;
var fetch = require("node-fetch");

var rooturl = "http://localhost:8088";
var header = {"Content-type":"application/x-www-form-urlencoded"};
/*
casephoto表的字段

Field:id Type:int(11) Null:NO Key:PRI Default: Extra:auto_increment 

Field:cid Type:int(11) Null:YES Key: Default: Extra: 

Field:imgurl Type:varchar(200) Null:YES Key: Default: Extra: 

*/
describe('casephoto表测试',() => {
    it("增加casephoto测试",() => {
        //请填写增加对象let body = "name=admin@yuanku.org&password=admin";
        let body = "cid=1&imgurl=img/abc.jpg";
        return fetch(rooturl.concat('/casephoto'),{method:'post',headers:header,body:body}).then(( res )=> {
            return res.json();
        }).then((json)=> {
            console.log(json);
            expect(json).to.be.deep.equal({"code":1,"msg":"操作成功!"});
        });
    });

    it("根据ID获取casephoto",()=> {      
        return fetch(rooturl.concat('/casephoto/1')).then(( res )=> {
            return res.json();
        }).then((json)=> {
            console.log(json);
            expect(json.data).to.not.be.empty;
        });
    });

    it("根据ID修改casephoto",()=> {
        //请填写修改对象let body = "name=update@yuanku.org&password=update";
        let body = "cid=1&imgurl=img/bcd.jpg";     
        return fetch(rooturl.concat('/casephoto/1'),{method:'put',headers:header,body:body}).then(( res )=> {
            return res.json();
        }).then((json)=> {
            console.log(json);
            expect(json).to.be.deep.equal({"code":1,"msg":"操作成功!"});
        });
    });

    it("根据ID删除casephoto",()=> {   
        return fetch(rooturl.concat('/casephoto/0'),{method:'delete'}).then(( res )=> {
            return res.json();
        }).then((json)=> {
            console.log(json);
            expect(json).to.be.deep.equal({"code":1,"msg":"操作成功!"});
        });
    });

    it("查询casephoto",()=> {   
        return fetch(rooturl.concat('/casephoto')).then(( res )=> {
            return res.json();
        }).then((json)=> {
            console.log(json);
            expect(json).to.not.be.empty;
        });
    });
});