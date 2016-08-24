'use strict';

var expect = require('chai').expect;
var fetch = require("node-fetch");

var rooturl = "http://localhost";
var header = {"Content-type":"application/x-www-form-urlencoded"};
/*
hrcase表的字段

Field:id Type:int(11) Null:NO Key:PRI Default: Extra:auto_increment 

Field:weparty Type:varchar(100) Null:YES Key: Default: Extra: 

Field:otherparty Type:varchar(100) Null:YES Key: Default: Extra: 

Field:thirdparty Type:varchar(100) Null:YES Key: Default: Extra: 

Field:casesubject Type:int(11) Null:YES Key: Default: Extra: 

Field:organizers Type:varchar(100) Null:YES Key: Default: Extra: 

Field:casestatus Type:int(11) Null:YES Key: Default: Extra: 

*/
describe('hrcase表测试',() => {
    it("增加hrcase测试",() => {
        //请填写增加对象let body = "name=admin@yuanku.org&password=admin";
        let body = "weparty=张三&otherparty=李四&thirdparty=王五&casesubject=1&organizers=华北大区&casestatus=1";
        return fetch(rooturl.concat('/hrcase'),{method:'post',headers:header,body:body}).then(( res )=> {
            return res.json();
        }).then((json)=> {
            console.log(json);
            expect(json).to.be.deep.equal({"code":1,"msg":"操作成功!"});
        });
    });

    it("根据ID获取hrcase",()=> {      
        return fetch(rooturl.concat('/hrcase/1')).then(( res )=> {
            return res.json();
        }).then((json)=> {
            console.log(json);
            expect(json.data).to.not.be.empty;
        });
    });

    it("根据ID修改hrcase",()=> {
        //请填写修改对象let body = "name=update@yuanku.org&password=update";
        let body = "weparty=张三1&otherparty=李四1&thirdparty=王五1&casesubject=2&organizers=华北大区1&casestatus=2";     
        return fetch(rooturl.concat('/hrcase/1'),{method:'put',headers:header,body:body}).then(( res )=> {
            return res.json();
        }).then((json)=> {
            console.log(json);
            expect(json).to.be.deep.equal({"code":1,"msg":"操作成功!"});
        });
    });

    it("根据ID删除hrcase",()=> {   
        return fetch(rooturl.concat('/hrcase/0'),{method:'delete'}).then(( res )=> {
            return res.json();
        }).then((json)=> {
            console.log(json);
            expect(json).to.be.deep.equal({"code":1,"msg":"操作成功!"});
        });
    });

    it("查询hrcase",()=> {   
        return fetch(rooturl.concat('/hrcase')).then(( res )=> {
            return res.json();
        }).then((json)=> {
            console.log(json);
            expect(json).to.not.be.empty;
        });
    });
});