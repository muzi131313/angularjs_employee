!function(){"use strict";angular.module("app",["ui.router","ngCookies"])}(),function(){"use strict";angular.module("app").value("dict",{}).run(["$http","dict",function(t,e){t({method:"GET",url:"/data/city.json"}).then(function(t){e.city=t},function(t){}),t({method:"GET",url:"/data/salary.json"}).then(function(t){e.salary=t},function(t){}),t({method:"GET",url:"/data/scale.json"}).then(function(t){e.scale=t},function(t){}),e.searchTabs=[{id:"city",name:"城市"},{id:"salary",name:"薪资"},{id:"scale",name:"公司规模"}]}])}(),function(){"use strict";function t(){}angular.module("app").provider("message",t.bind(t)),t.prototype.setLevel=function(t){t=t},t.prototype.$get=function(){return{log:function(){"log"===level?console.log(arguments):angular.noop()},error:function(){"error"===level?console.error(arguments):angular.noop()},warn:function(){"error"===level?console.warn(arguments):angular.noop()}}}}(),function(){"use strict";angular.module("app").config(["$stateProvider","$urlRouterProvider",function(t,e){t.state("main",{url:"/main",templateUrl:"view/main.html",controller:"mainCtrl"}).state("position",{url:"/position/:id",templateUrl:"view/position.html",controller:"positionCtrl"}).state("company",{url:"/company/:id",templateUrl:"view/company.html",controller:"companyCtrl"}).state("search",{url:"/search",templateUrl:"view/search.html",controller:"searchCtrl"}).state("my",{url:"/my",templateUrl:"view/my.html",controller:"myCtrl"}),e.otherwise("main")}])}(),function(){"use strict";angular.module("app").controller("companyCtrl",["$scope","$http","$state",function(t,e,n){e({method:"GET",url:"/data/company.json",params:{companyId:n.params.id}}).then(function(e){t.company=e.data,t.$broadcast("to-child",{word:"world!"})},function(t){}),t.$on("to-parent",function(t,e){console.log("to-parent",t,e)})}])}(),function(){"use strict";angular.module("app").controller("mainCtrl",["$scope","$http",function(t,e){e({method:"GET",url:"/data/positionList.json"}).then(function(e){t.jobList=e.data},function(t){})}])}(),function(){"use strict";angular.module("app").controller("myCtrl",["$scope","$http","$state",function(t,e,n){}])}(),function(){"use strict";angular.module("app").controller("positionCtrl",["$scope","$http","$state","$q","cache",function(t,e,n,o,a){function i(n){var a=o.defer();return e({method:"GET",url:"/data/company.json",params:{companyId:n}}).then(function(e){t.company=e.data,a.resolve(e)},function(t){a.reject(t)}),a.promise}var r=n.params.id;t.isLogin=!1,t.isActive=!1,a.put("key","day"),function(){var n=o.defer();return e({method:"GET",url:"/data/position.json",params:{positionId:r}}).then(function(e){t.position=e.data,n.resolve(e)},function(t){n.reject(t)}),n.promise}().then(function(t){i(t.data.companyId)})}])}(),function(){"use strict";angular.module("app").controller("searchCtrl",["$scope","$http","$state","dict",function(t,e,n,o){function a(t,e,n){t=t||[];var o,a,i,r,c,l;return t=t.filter(function(t,s){return a=r=l="",n&&Object.keys(n).length&&(n.cityName&&(a=n.cityName),n.jobName&&(r=n.jobName),n.salaryName&&(l=n.salaryName)),e&&(a=r=l=e),o=!!~t.cityName.indexOf(e),i=!!~t.job.indexOf(e),c=!!~t.salaryName.indexOf(e),o||i||c})}function i(n,o){e({method:"GET",url:"/data/positionList.json",params:o||{}}).then(function(e){a(e.data,n,o),t.jobList=e.data},function(t){})}t.search=function(){i(t.name,{jobName:t.jobName,cityName:t.cityName,salarayName:t.salarayName})},t.cancel=function(){t.name="",t.jobName="",t.cityName="",t.salarayName="",t.search()},t.tabClick=function(e,n){console.log("tab click item: ",e,n,o),t.sheets.list=o[e].data,t.sheets.visible=!0},t.selectClick=function(t,e){console.log("selectClick item: ",t,e)},t.search(),t.tabs=o.searchTabs,t.city=o.city,t.salary=o.salary,t.scale=o.scale,t.sheets={}}])}(),function(){"use strict";angular.module("app").factory("cache",["$cookies",function(t){return{put:function(e,n){t.put(e,n)},get:function(e){return t.get(e)},remove:function(e){t.remove(e)}}}])}(),function(){"use strict";angular.module("app").directive("appSheet",[function(){return{restrict:"A",replace:!0,templateUrl:"view/index/sheet.html",scope:{datas:"=",visible:"=",select:"&"},link:function(t,e,n){t.cancelSheet=function(){t.visible=!1}}}}])}(),function(){"use strict";angular.module("app").directive("appTab",[function(){return{restrict:"A",replace:!0,templateUrl:"view/index/tab.html",scope:{data:"=",tabClick:"&"},link:function(t,e,n){t.selectId=t.data[0].id,t.click=function(e){t.selectId=e.id,t.tabClick(e)}}}}])}(),function(){"use strict";angular.module("app").directive("appCompany",[function(){return{restrict:"A",replace:!0,templateUrl:"view/job/company.html",scope:{company:"="},link:function(t,e,n){}}}])}(),function(){"use strict";angular.module("app").directive("appPositionClaz",[function(){return{restrict:"A",replace:!0,templateUrl:"view/job/positionClaz.html",scope:{clazes:"="},link:function(t,e,n){var o=this;t.showCategory=function(e){o.pos(t,e)},t.$watch("clazes",function(e,n,o){e&&t.showCategory(0)})},pos:function(t,e){t.positionList=t.clazes.positionClass[e].positionList,t.isActive=e}}}])}(),function(){"use strict";angular.module("app").directive("appPositionInfo",[function(){return{restrict:"A",replace:!0,templateUrl:"view/job/positionInfo.html",scope:{isActive:"=",isLogin:"=",position:"="},link:function(t,e,n){t.imgPath="image/star"+(t.isActive?"active":"")+".png"}}}])}(),function(){"use strict";angular.module("app").directive("appFooter",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/footer.html",link:function(t,e,n){}}}])}(),function(){"use strict";angular.module("app").directive("appHead",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/head.html",link:function(t,e,n){}}}])}(),function(){"use strict";angular.module("app").directive("appHeadBar",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/headBar.html",scope:{title:"@"},link:function(t,e,n){t.back=function(){window.history.back()},t.$on("to-child",function(t,e){console.log("to-child",t,e)}),t.$emit("to-parent",{show:"hai"})}}}])}(),function(){"use strict";angular.module("app").directive("appPositionList",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/positionList.html",scope:{data:"="},link:function(t,e,n){}}}])}();