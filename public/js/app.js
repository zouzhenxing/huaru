angular.module("myApp",["ionic"])
.controller("SideMenuCtrl",function($scope,$ionicSideMenuDelegate){
     $scope.toggleMenu = function(dir){
    $ionicSideMenuDelegate["toggle"+dir]();
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
                      // 后退按钮
                       $scope.goBack=function(){
                          alert(checkState);
                            $state.go("userMain.main");
                            $scope.title="主页";
                            $scope.selectedRow = 0;
                    }
        }

  })
   .state("userMain.main",{
    url : "/main",
    templateUrl : "./views/main.html",
    controller:function(){

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
     
        var focus=false;
        $scope.flag=true;
        $scope.data=[
            {name:"民事纠纷案",number:"001",sheme:"办案主题",role:"原告",lawyer:"张三",state:"请上报"},
             {name:"民事纠纷案",number:"002",sheme:"办案主题",role:"原告",lawyer:"张三",state:"请上报"},
              {name:"民事纠纷案",number:"003",sheme:"办案主题",role:"原告",lawyer:"张三",state:"请上报"},
               {name:"民事纠纷案",number:"004",sheme:"办案主题",role:"原告",lawyer:"张三",state:"已结案"},
                {name:"民事纠纷案",number:"005",sheme:"办案主题",role:"原告",lawyer:"张三",state:"已结案"}
        ];
      $scope.goToMyCase=function(){
        $state.go("userMain.tabs-main.delCase");
         $scope.$emit("changeTitle",{title:"案件时间设置"})
      }
      $scope.focus=function(){
            $scope.flag=false;          
      }
      $scope.blur=function(){
        $scope.flag=true;
      }
      $scope.getFocus=function(){
        $scope.flag=false;
      
      }
    }
  })
  .state("userMain.search",{
    url:"/search",
    templateUrl:"./views/search.html",
    controller:function( $ionicSideMenuDelegate){
         $ionicSideMenuDelegate.toggleRight()
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
    controller:function(){
      
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
  .state("userMain.tabs-main.delCase",{
    url:"/delCase",
    views:{
      "delCase":{
        templateUrl:"./views/delCase.html",
        controller:function(){

        }
      }
    }
  })
  .state("userMain.tabs-main.takePhoto",{
    url:"/takePhoto",
    views:{
      "takePhoto":{
        templateUrl:"./views/takePhoto.html",
        controller:function(){

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
        controller:function(){

        }
      }
    }
  })
  .state("userMain.tabs-main.more",{
    url:"/more",
    views:{
      "more":{
        templateUrl:"./views/more.html",
        controller:function(){

        }
      }
    }
  })
})


