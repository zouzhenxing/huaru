angular.module("service_module",["constant_module"]).
service("get_hrcase",function($http,api){
	return {
				get_hrcase : function(scope){
					return $http.get("http://"+api.prod+"/hrcase");
				}
			}
})
.service("add_hrcase",function($http,api){
		return {
			add_hrcase:function(scope){
				return $http({
                    method:"post",
                    url:"http://"+api.prod+"/hrcase",
                    data:{"weparty":scope.data[3].content,"otherparty":"李四","thirdparty":"王五","casesubject":1,"organizers":"华北大区","casestatus":1}
                  })
			}
		}
})
.service("get_casestatus",function($http,api){
	return {
				get_casestatus : function(scope){
					return  $http.get("http://"+api.prod+"/casestatus/"+scope.id)
				}
			}
})
.service("get_delCase",function($http,api){
	return {
				get_delCase : function(scope){
					return  $http.get("http://"+api.prod+"/hrcase/"+scope.id)
				}
			}
})

.service("get_photo",function($http,api){
	return {
				get_photo : function(scope){
					return $http.get("http://"+api.prod+"/casephoto/"+scope.id)
            		
				}
			}
})




