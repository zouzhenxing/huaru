angular.module("myApp",["ionic","ctrl_module","service_module","constant_module"])
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
       controller:"userMain_ctrl"
  })
   .state("userMain.main",{
    url : "/main",
    templateUrl : "./views/main.html",
    controller:"main_ctrl"
  })
   .state("userMain.addCase",{
    url:"/addCase",
    templateUrl:"./views/addCase.html",
    controller:"addCase_ctrl"
   })
  .state("userMain.tabs-main",{
    url : "/tabs-main",
    templateUrl : "./views/tabs-main.html",
    controller:function(){

    }
  })
 
  .state("userMain.myCase",{
    url:"/myCase",
    cache:false,
    templateUrl:"./views/myCase.html",
    controller:"myCase_ctrl"
  })
  .state("userMain.search",{
    url:"/search",
    templateUrl:"./views/search.html",
    controller:"search_ctrl"
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
    params:{id:""},
    views:{
      "time":{
        templateUrl:"./views/time.html",
        controller:"time_ctrl"
      }
    }
  })
  .state("userMain.tabs-main.delCase",{
    url:"delCase",
    params:{id:""},
    views:{
      "delCase":{
        templateUrl:"./views/delCase.html",
        controller:"delCase_ctrl"
      }
    }
  })
  .state("userMain.tabs-main.takePhoto",{
    url:"/takePhoto",
    params:{id:""},
    views:{
      "takePhoto":{
        templateUrl:"./views/takePhoto.html",
        controller:"takePhoto_ctrl"
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
    params:{id:""},
    views:{
      "casePeople":{
        templateUrl:"./views/casePeople.html",
        controller:"casePeople_ctrl"
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


