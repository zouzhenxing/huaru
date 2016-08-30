angular.module("myApp",["ionic"])
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
.config(function($stateProvider,$urlRouterProvider,$ionicConfigProvider){
//tabs位置配置
$ionicConfigProvider.platform.ios.tabs.style('standard');
$ionicConfigProvider.platform.ios.tabs.position('bottom');
$ionicConfigProvider.platform.android.tabs.style('standard');
$ionicConfigProvider.platform.android.tabs.position('bottom');

$ionicConfigProvider.platform.ios.navBar.alignTitle('center');
$ionicConfigProvider.platform.android.navBar.alignTitle('center');

$ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
$ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

$ionicConfigProvider.platform.ios.views.transition('ios');
$ionicConfigProvider.platform.android.views.transition('android');


  $urlRouterProvider.otherwise("/userMain");

  $stateProvider
  .state("userMain",{
    url:"/userMain",
    templateUrl:"./views/userMain.html",
       controller:function($scope,$state,$ionicSideMenuDelegate){
                 // 初始化
                  $state.go("userMain.main");
                  $scope.title="主页";
                  var checkState="main";
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

                              $state.go("userMain.tabs-main."+state);
                              $scope.title=title;
                      }
                      $scope.$on("changeTitle",function(e,d){
                        $scope.title=d.title;
                      })

                        $scope.$on("change_bg",function(){
                        $scope.selectedRow=1;
                      })

                      // 后退按钮
                       $scope.goBack=function(){
                            $state.go("userMain.main");
                            $scope.title="主页";
                            checkState='main';
                            $scope.selectedRow = 0;
                    }
        }

  })
   .state("userMain.main",{
    url : "/main",
    templateUrl : "./views/main.html",
    controller:function($scope,$state,$ionicPopup){
        $scope.manageCase=function(){
          $state.go("userMain.myCase");
           $scope.$emit("changeTitle",{title:"我的案件"});
           $scope.$emit("change_bg");
           $scope.$emit("checkState",{checkState:"myCase"});
        }
        $scope.addCase=function(){
              var confirmPopup = $ionicPopup.confirm({
               title: '添加新的案件',
               template: '您确定添加新的案件?',
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
                 console.log(res);
               } else {
                 console.log(res);
               }
             });
        }
    }
  })
  .state("userMain.tabs-main",{
    url : "/tabs-main",
    templateUrl : "./views/tabs-main.html",
    controller:function(){

    }
  })
 
  .state("userMain.myCase",{
    url:"/myCase",
    templateUrl:"./views/myCase.html",
    controller:function($scope,$state){
        $scope.data=[
            {name:"民事纠纷案",number:"001",sheme:"办案主题",role:"原告",lawyer:"张三",state:"请上报"},
             {name:"民事纠纷案",number:"002",sheme:"办案主题",role:"原告",lawyer:"张三",state:"请上报"},
              {name:"民事纠纷案",number:"003",sheme:"办案主题",role:"原告",lawyer:"张三",state:"请上报"},
               {name:"民事纠纷案",number:"004",sheme:"办案主题",role:"原告",lawyer:"张三",state:"已结案"},
                {name:"民事纠纷案",number:"005",sheme:"办案主题",role:"原告",lawyer:"张三",state:"已结案"}
        ];
      $scope.goToMyCase=function(){
        $state.go("userMain.tabs-main.delCase");
         $scope.$emit("changeTitle",{title:"具体"})
      }
     
    }
  })
  .state("userMain.search",{
    url:"/search",
    templateUrl:"./views/search.html",
    controller:function($scope,$ionicSideMenuDelegate){
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
        
    
    }
  })
  .state("userMain.newDoc",{
    url:"/newDoc",
    templateUrl:"./views/newDoc.html",
    controller:function(){
      
    }
  })
  .state("userMain.myDoc",{
    url:"/myDoc",
    templateUrl:"./views/myDoc.html",
    controller:function(){
      
    }
  })
  .state("userMain.lawyerLetter",{
    url:"/lawyerLetter",
    templateUrl:"./views/lawyerLetter.html",
    controller:function(){
      
    }
  })
  .state("userMain.caseLibrary",{
    url:"/caseLibrary",
    templateUrl:"./views/caseLibrary",
    controller:function($scope){
       
    }
  })
  .state("userMain.help",{
    url:"/help",
    templateUrl:"./views/help.html",
    controller:function(){
      
    }
  })
  .state("userMain.guide",{
    url:"/guide",
    templateUrl:"./views/guide.html",
    controller:function(){
      
    }
  })
  .state("userMain.tabs-main.time",{
    url:"/time",
    views:{
      "time":{
        templateUrl:"./views/time.html",
        controller:function($scope,$ionicPopup){
                $scope.data=[
                  {name:"收到起诉日期",time:"2016-08-01"},
                  {name:"答辩截止日期",time:"2016-08-01"},
                  {name:"举证截止日期",time:"2016-08-01"},
                  {name:"反诉截止日期",time:"2016-08-01"},
                  {name:"一审开庭日期",time:"2016-08-01"},
                  {name:"一审（重审）开庭时间",time:"2016-08-01"}
                 
                ]
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
            }

      }
    }
  })
  .state("userMain.tabs-main.delCase",{
    url:"delCase",
    views:{
      "delCase":{
        templateUrl:"./views/delCase.html",
        controller:function($scope){
            $scope.caseid="0123456789";
            $scope.data=[
            {name:"案件标的",content:"1000万以下"},
             {name:"我方当事人",content:"张山"},
              {name:"第三人",content:"张山"},
               {name:"主办法律顾问",content:"案件主办单位"},
                {name:"案件主办地区",content:"江苏大区"},
                 {name:"控股反馈",content:"江苏大区江苏大区江苏大区江苏大区江苏大区江苏大区江苏大区江苏大区江苏大区江苏大区江苏大区"},
                  {name:"控股反馈",content:"江苏大区江苏大区江苏大区江苏大区江苏大区江苏大区江苏大区江苏大区江苏大区江苏大区江苏大区"},
                  
            ]
        }
      }
    }
  })
  .state("userMain.tabs-main.takePhoto",{
    url:"/takePhoto",
    views:{
      "takePhoto":{
        templateUrl:"./views/takePhoto.html",
        controller:function($scope){
          var wSrc=["./imgs/add.png","./imgs/reduce.png"];
  
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
                srcs:[{src:"./imgs/chan.png"},{src:"./imgs/chan.png"},{src:"./imgs/chan.png"}]
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
        }
      }
    }
  })
  .state("userMain.tabs-main.doc",{
    url:"/doc",
    views:{
      "doc":{
        templateUrl:"./views/doc.html",
        controller:function(){

        }
      }
    }
  })
  .state("userMain.tabs-main.casePeople",{
    url:"/casePeople",
    views:{
      "casePeople":{
        templateUrl:"./views/casePeople.html",
        controller:function($scope){
             $scope.data=[
          {name:"案件主体代表",srcs:[{src:"./imgs/chan.png"}]},
          {name:"案件主理成员",srcs:[{src:"./imgs/chan.png"},{src:"./imgs/chan.png"},{src:"./imgs/chan.png"}]},
          {name:"案件协理成员",srcs:[{src:"./imgs/chan.png"},{src:"./imgs/chan.png"},{src:"./imgs/chan.png"}]},
          {name:"外聘律师评审委员会",srcs:[{src:"./imgs/chan.png"},{src:"./imgs/chan.png"},{src:"./imgs/chan.png"}]},
        ]
        }
      }
    }
  })
  .state("userMain.tabs-main.lawyerWay",{
    url:"/lawyerWay",
    views:{
      "lawyerWay":{
        templateUrl:"./views/lawyerWay.html",
        controller:function(){

        }
      }
    }
  })
})


