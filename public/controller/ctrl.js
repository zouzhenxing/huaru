angular.module("ctrl_module",[])
.controller("SideMenuCtrl",function($scope,$ionicSideMenuDelegate){
     $scope.toggleMenu = function(dir){
    $ionicSideMenuDelegate["toggle"+dir]();
  }
})
.controller("search_ctrl",function($scope){
      $scope.search=function(e,id){
              var e=e||window.event;
              var txt=$scope.txt;
              if(id){
                 alert(id);
               }else if(e.keyCode=="13"){
                  alert(txt);
               }
             
            }
})
.controller("addCase_ctrl",function($scope,$ionicPopup,$state,$http,add_hrcase){
    $scope.data=[
        {name:"案件名称",content:""},
        {name:"办案主题",content:""},
        {name:"我方角色",content:""},
        {name:"主办律师",content:""}

    ];
    var flag=true;
    $scope.submit=function(){
      for(var i=0;i<$scope.data.length;i++){
        if($scope.data[i].content==""){
          flag=false;
          alert("请填写完整");
          return false;  
        }
      }
      flag=true;
      if(flag){
           var confirmPopup = $ionicPopup.confirm({
               title: '添加新的案件',
               template: '您确定添加?',
                buttons: [
               { text: '取消' ,
                  onTap:function(){
                    return false;
                  }
                },
               {
                 text: '确定',
                 type: 'button-positive',
                onTap:function(){
                  return true;
                }
               }
             ]
             });
             confirmPopup.then(function(res) {
               if(res) {
                 add_hrcase.add_hrcase($scope).success(function(data){
                    alert("添加成功");
                    for(var i=0;i<$scope.data.length;i++){
                      $scope.data[i].content="";
                    }
                  })
                 $state.go("userMain.myCase");
                  $scope.$emit("changeTitle",{title:"我的案件"});
               }
             });
      }
    }
})
.controller("userMain_ctrl",function($scope,$state,$ionicSideMenuDelegate){
                     // 初始化
                  $state.go("userMain.main");
                  $scope.title="主页";
                  var checkState="main";
                  var id_;
                  $scope.selectedRow = 0;
                  $scope.classify=[
                        {content:"主页",state:"main"},
                        {content:"我的案件",state:"myCase"},
                        {content:"案件搜索",state:"search"},
                        {content:"新建文档",state:"newDoc"},
                        {content:"我的文档",state:"myDoc"},
                        {content:"律师函",state:"lawyerLetter"},
                        {content:"案例库",state:"caseLibrary"},
                        {content:"办案指引",state:"guide"},
                        {content:"帮助",state:"help"},
                        
                  ] ;
                    $scope.$on("checkState",function(e,b){
                        checkState=b.checkState;
                    })
                  // 分类跳转函数
                   $scope.goTo=function(state,flag,content,row){
                   $scope.selectedRow = row;
                        !flag&&$ionicSideMenuDelegate.toggleRight()              
                    if(state!=checkState||state=="myCase"){
                       checkState=state;
                      $state.go("userMain."+state);
        
                      $scope.title=content;
                    }
                    }  
                    // 底部跳转按钮
                     $scope.footerGo=function(state,title){

                              $state.go("userMain.tabs-main."+state,{id:id_});
                              $scope.title=title;
                      }
                      $scope.$on("changeTitle",function(e,d){
                        $scope.title=d.title;
                      })

                        $scope.$on("change_bg",function(){
                        $scope.selectedRow=1;
                      })
                      $scope.$on("id",function(e,d){
                          id_=d.id;
                      })

                      // 后退按钮
                       $scope.goBack=function(){
                            $state.go("userMain.main");
                            $scope.title="主页";
                            checkState='main';
                            $scope.selectedRow = 0;
                    }
})
.controller("main_ctrl",function($scope,$state,$ionicPopup){
       $scope.manageCase=function(){
          $state.go("userMain.myCase");
           $scope.$emit("changeTitle",{title:"我的案件"});
           $scope.$emit("change_bg");
           $scope.$emit("checkState",{checkState:"myCase"});
        }
        $scope.addCase=function(){
             
                 $state.go("userMain.addCase");
                  $scope.$emit("changeTitle",{title:"添加案件"});
               }
})
.controller("myCase_ctrl",function($scope,$state,$http,get_hrcase){
        var  str;
  $scope.data=[];
get_hrcase.get_hrcase($scope).success(function(obj){
		var data=obj.data;
          if(data.length!=0){
           
              for(var i=0;i<data.length;i++){
                 if(data[i].casestatus=='1'){
                    str='请上报';
                  }else{
                    str='已结案';
                  }
                $scope.data.push({
                  name:"民事纠纷案",
                  sheme:"办案主题",
                  role:"原告",
                  lawyer:data[i].weparty,
                  id:data[i].id,
                  casestatus:str
                })
                 
              }
          }else{
            alert("数据出错")
          }
})

        
      $scope.goToMyCase=function(){
        $state.go("userMain.tabs-main.delCase",{id:this.item.id});
         $scope.$emit("changeTitle",{title:"案件具体信息"});
         $scope.$emit("id",{id:this.item.id});
      }
})
.controller("search_ctrl",function($scope,$ionicSideMenuDelegate){
   $ionicSideMenuDelegate.toggleRight();
         $scope.tags=[
         {tag:"控股总部",id:"0"},
         {tag:"江苏大区",id:"1"},
         {tag:"西北大区",id:"2"},
         {tag:"内蒙古大区",id:"3"},
         {tag:"控股总部",id:"4"},
         {tag:"江苏大区",id:"5"},
         {tag:"西北大区",id:"6"},
         {tag:"内蒙古大区",id:"7"},
         {tag:"控股总部",id:"8"},
         {tag:"江苏大区",id:"9"},
         {tag:"西北大区",id:"10"},
         {tag:"内蒙古大区",id:"11"},
         ]
})
.controller("time_ctrl",function($scope,$ionicPopup,$http,$stateParams,get_casestatus){
                 $scope.data=[
                  {name:"收到起诉日期",time:""},
                  {name:"答辩截止日期",time:"2016-08-01"},
                  {name:"举证截止日期",time:"2016-08-01"},
                  {name:"反诉截止日期",time:"2016-08-01"},
                  {name:"一审开庭日期",time:"2016-08-01"},
                  {name:"一审（重审）开庭时间",time:"2016-08-01"}
                 
                ]

          $scope.id=$stateParams.id;
         get_casestatus.get_casestatus($scope).success(function(obj){
            var data=obj.data[0];
              $scope.data[0].time=data.date;
            
          })
              
                 $scope.add=function(){
                    
                 var myPopup = $ionicPopup.show({
             template: '<input type="text" ng-model="data.case">',
             title: '输入事项',
             subTitle: '请输入新增事项',
             scope: $scope,
             buttons: [
               { 
                text: '取消' ,
                tap: function(){
                  return false;
                }
                },
               {
                 text: '<b>确定</b>',
                 type: 'button-positive',
                 onTap: function(e) {
                    if (!$scope.data.case) {
                     // 不允许用户关闭，除非输入 wifi 密码
                     e.preventDefault();
                   } else {
                     return $scope.data.case;
                   }
                 }
               },
             ]
           });
           myPopup.then(function(res) {
            if(res){
               $scope.data.push({name:res,time:(function(){
                var d=new Date();
                var y=d.getFullYear();
                var m=d.getMonth();
                var r=d.getDate();
                return y+"-"+(m+1)+"-"+r;
               })()})

            
            }
              
              
           });


              
            } 


            $scope.set_time=function(){
              var self=this;
                 var myPopup = $ionicPopup.show({
             template: '<input type="text" ng-model="data.time">',
             title: '修改日期',
             subTitle: '请输入正确格式如：2016-01-01',
             scope: $scope,
             buttons: [
               { 
                text: '取消' ,
                tap: function(){
                  return false;
                }
                },
               {
                 text: '<b>确定</b>',
                 type: 'button-positive',
                 onTap: function(e) {
                    if (!$scope.data.time) {
                     // 不允许用户关闭，除非输入 wifi 密码
                     e.preventDefault();
                   } else {
                     return $scope.data.time;
                   }
                 }
               },
             ]
           });
           myPopup.then(function(res) {
            if(res){
              reg=/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/;
             if(reg.test(res)){
                self.item.time=res;
             }else{
              alert("不合法")
             }
            }
              
              
           });
          }       
})
.controller("delCase_ctrl",function($scope,$http,$stateParams,$state,get_delCase){
        $scope.id=$stateParams.id
          get_delCase.get_delCase($scope).success(function(obj){
            var data=obj.data[0];
            $scope.id=data.id;
            $scope.casestatus=data.casestatus;
            $scope.data=[
            {name:"案件标的",content:data.casesubject},
             {name:"我方当事人",content:data.weparty},
              {name:"第三人",content:data.thirdparty},
               {name:"主办法律顾问",content:"张三"},
                {name:"案件主办地区",content:data.organizers},
                 {name:"控股反馈",content:data.organizers},
                  {name:"控股反馈",content:data.organizers}    
            ]
          })
})
.controller("takePhoto_ctrl",function($scope,$http,$state,$stateParams,get_photo){
          $scope.id=$stateParams.id;
          var src=[];  
            get_photo.get_photo($scope).success(function(obj){
              src.push({src:obj.data[0].imgurl})
          });
            // $http({
            // 	url:"http://localhost:8088/casephoto/3",
            // 	data:{cid:3,"imgurl":"./image/chan.png"},
            // 	method:"put"
            // }).success(function(data){
            // 	console.log(data);
            // })
          var wSrc=["./image/add.png","./image/reduce.png"];
  
            $scope.data=[
            ]
            for(var i=0;i<5;i++){
              $scope.data.push({
                name1:"案件处理流程",
                name2_1:"一审",
                name2_2:"二审",
                name3_1:"策略思路",
                name3_2:"案件思路",
                name3_3:"证据材料",
                flag2:false,
                flag3_1:false,
                flag3_2:false,
                flag4_1:false,
                flag4_2:false,
                flag4_3:false,
                flag4_4:false,
                 flag4_5:false,
                flag4_6:false,
                wSrc2:wSrc[0],
                wSrc3_1:wSrc[0],
                wSrc3_2:wSrc[0],
                wSrc4_1:wSrc[0],
                wSrc4_2:wSrc[0],
                wSrc4_3:wSrc[0],
                wSrc4_4:wSrc[0],
                 wSrc4_5:wSrc[0],
                wSrc4_6:wSrc[0],
                srcs:src
              })
            }
            $scope.toggle=function(e,flagI){
               var src=flagI.replace(/flag/,"wSrc");
              var e=e||window.event;
               
             if(e.stopPropagation){
              e.stopPropagation()
            }else{
                e.cancelBubble = true
              }
              if(this.item[flagI]){
                this.item[src]=wSrc[0];
              }else{
                this.item[src]=wSrc[1];
              }
             this.item[flagI]=!this.item[flagI];
            
            }
})
.controller("casePeople_ctrl",function($scope,$http,$state,$stateParams,get_photo){
          var src=[];
         	$scope.id=$stateParams.id;
          get_photo.get_photo($scope).success(function(obj){
             src.push({src:obj.data[0].imgurl});
          })
             $scope.data=[
          {name:"案件主体代表",srcs:src},
          {name:"案件主理成员",srcs:src},
          {name:"案件协理成员",srcs:src},
          {name:"外聘律师评审委员会",srcs:src}
        ]
})