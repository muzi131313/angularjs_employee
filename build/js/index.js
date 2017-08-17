(function () {
	'use strict';
	
	angular.module('app', ['ui.router', 'ngCookies']);
})();
(function () {
	'use strict';

	// value: 创建全局变量
	angular.module('app').value('dict', {}).run(['$http', 'dict', function ($http, dict) {
		
		// 城市
		$http({
			method: 'GET',
  			url: '/data/city.json'
		}).then(function (resp) {
			dict.city = resp;
		}, function (resp) {
			
		});

		// 薪资
		$http({
			method: 'GET',
  			url: '/data/salary.json'
		}).then(function (resp) {
			dict.salary = resp;
		}, function (resp) {
			
		});

		// 范围
		$http({
			method: 'GET',
  			url: '/data/scale.json'
		}).then(function (resp) {
			dict.scale = resp;
		}, function (resp) {
			
		});

		// tab标题
		dict.searchTabs = [{
			id: 'city', 
			name: '城市'
		}, {
			id: 'salary',
			name: '薪资'
		}, {
			id: 'scale',
			name: '公司规模'
		}];
	}]);
})();
(function(){
	'use strict';

	/**
	 * copy from: https://github.com/ShuyunXIANFESchool/FE-problem-collection/issues/21
	 
	// 注意注入的时候，加上Provider后缀
	angular.module('app').config(function(messageProvider) {
	     messageProvider.setLevel('error');
	});

	//注入的时候，无需加后缀
	angular.module('app').controller('MainCtrl', function(message) {
	     message.error('just a test');
	});

	 */
	angular.module('app').provider('message', message.bind(message));
	function message() {
        var level = 'log';
    }
    // 该方法可以在 config 阶段使用
    message.prototype.setLevel = function (level) {
    	level = level;
    };
    // 该方法返回的对象方法可以在 run 阶段使用
    message.prototype.$get = function () {
    	return {
            log: function() {
                if(level ===  'log'){
                	console.log(arguments);
                }else{
					angular.noop();
                }
            },
            error: function() {
            	if(level ===  'error'){
                	console.error(arguments);
                }else{
					angular.noop();
                }
            },
            warn: function() {
            	if(level ===  'error'){
                	console.warn(arguments);
                }else{
					angular.noop();
                }
            }
        };
    };
})();
(function () {
	'use strict';

	angular.module('app').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
		$stateProvider.state('main', {
			url: '/main',
			templateUrl: 'view/main.html',
			controller: 'mainCtrl'
		}).state('position', {
			url: '/position/:id',
			templateUrl: 'view/position.html',
			controller: 'positionCtrl'
		}).state('company', {
			url: '/company/:id',
			templateUrl: 'view/company.html',
			controller: 'companyCtrl'
		}).state('search', {
			url: '/search',
			templateUrl: 'view/search.html',
			controller: 'searchCtrl'
		}).state('my', {
			url: '/my',
			templateUrl: 'view/my.html',
			controller: 'myCtrl'
		});
		$urlRouterProvider.otherwise('main');
	}]);
})();
(function () {
	'use strict';
	
	angular.module('app').controller('companyCtrl', ['$scope', '$http', '$state', function ($scope, $http, $state) {
		
		var companyId = $state.params.id;

		$http({
			method: 'GET',
  			url: '/data/company.json',
  			params: {
  				companyId: companyId
  			}
		}).then(function (resp) {
			$scope.company = resp.data;

			$scope.$broadcast('to-child', {word: 'world!'});

		}, function (resp) {
			
		});

		$scope.$on('to-parent', function (event, data) {
			console.log('to-parent', event, data);
		});
	}]);
})();
(function () {
	'use strict';

	angular.module('app').controller('mainCtrl', ['$scope', '$http', function ($scope, $http) {
		$http({
			method: 'GET',
  			url: '/data/positionList.json'
		}).then(function (resp) {
			$scope.jobList = resp.data;
		}, function (err) {
			
		});
	}]);
})();
(function () {
	'use strict';
	
	angular.module('app').controller('myCtrl', ['$scope', '$http', '$state', function ($scope, $http, $state) {
		
	}]);
})();
(function () {
	'use strict';
	
	angular.module('app').controller('positionCtrl', ['$scope', '$http', '$state', '$q', 'cache', function ($scope, $http, $state, $q, cache) {

		var positionId = $state.params.id;

		$scope.isLogin = false;
		$scope.isActive = false;

		cache.put('key', 'day');

		// position
		function getPosition() {
			var def = $q.defer();
			$http({
				method: 'GET',
				url: '/data/position.json',
				params: {
					positionId: positionId
				}
			}).then(function (resp) {
				$scope.position = resp.data;
				def.resolve(resp);
			}, function (err) {
				def.reject(err);
			});
			return def.promise;
		}

		// company
		function getCompany(companyId) {
			var def = $q.defer();
			$http({
				method: 'GET',
	  			url: '/data/company.json',
	  			params: {
	  				companyId: companyId
	  			}
			}).then(function (resp) {
				$scope.company = resp.data;
				def.resolve(resp);
			}, function (err) {
				def.reject(err);
			});
			return def.promise;
		}

		getPosition().then(function (data) {
			getCompany(data.data.companyId);
		});
	}]);
})();
(function () {
	'use strict';

	angular.module('app').controller('searchCtrl', ['$scope', '$http', '$state', 'dict', function ($scope, $http, $state, dict) {
		/**
		 * [filterData 数据过滤（模拟后台查询数据）]
		 * @param  {[type]} data      [要过滤的数据]
		 * @param  {[type]} fuzzyName [模糊查询的名字]
		 * @param  {[type]} params    [参数: {cityName: '', jobName: '', salarayName: ''}]
		 * @return {[type]}           [description]
		 */
		function filterData(data, fuzzyName, params) {
			data = data || [];
			var hasCity,
				cityName,
				hasJob,
				jobName,
				hasSalary,
				salaryName;
			data = data.filter(function (item, index) {
				cityName = jobName = salaryName = '';
				if(params && Object.keys(params).length){
					if(params.cityName) cityName = params.cityName;
					if(params.jobName) jobName = params.jobName;
					if(params.salaryName) salaryName = params.salaryName;
				}

				if(fuzzyName) cityName = jobName = salaryName = fuzzyName;

				hasCity = ~item.cityName.indexOf(fuzzyName) ? true : false;
				hasJob = ~item.job.indexOf(fuzzyName) ? true : false;
				hasSalary = ~item.salaryName.indexOf(fuzzyName) ? true : false;

				return hasCity || hasJob || hasSalary;
			});
			return data;
		}

		/**
		 * [queryJob 工作查询]
		 * @param  {[type]} name   [description]
		 * @param  {[type]} params [description]
		 * @return {[type]}        [description]
		 */
		function queryJob(name, params) {
			// console.log('name and params: ', name, params);
			$http({
				method: 'GET',
	  			url: '/data/positionList.json',
	  			params: (params || {})
			}).then(function (resp) {
				var data = resp.data;
				filterData(data, name, params);
				$scope.jobList = resp.data;
			}, function (resp) {

			});
		}

		/**
		 * [search 搜索事件]
		 * @return {[type]} [description]
		 */
		$scope.search = function () {
			queryJob($scope.name, {
				jobName: $scope.jobName,
				cityName: $scope.cityName,
				salarayName: $scope.salarayName
			});
		};
		/**
		 * [cancel 取消事件]
		 * @return {[type]} [description]
		 */
		$scope.cancel = function () {
			// console.log('cancel...');
			$scope.name = '';
			$scope.jobName = '';
			$scope.cityName = '';
			$scope.salarayName = '';
			$scope.search();
		};

		/**
		 * [tabClick tab点击事件]
		 * @param  {[type]} item [description]
		 * @return {[type]}      [description]
		 */
		$scope.tabClick = function(id, name) {
			console.log('tab click item: ', id, name, dict);
			$scope.sheets.list = dict[id].data;
			$scope.sheets.visible = true;
		}

		/**
		 * [select 选择框选中事件]
		 * @param  {[type]} item [description]
		 * @return {[type]}      [description]
		 */
		$scope.selectClick = function(id, name) {
			console.log('selectClick item: ', id, name);
			// TODO: 点击之后，tab的文字发生变化
		}

		// init event
		$scope.search();
		$scope.tabs = dict.searchTabs;
		// TODO: 1.初始化弹框数据; 2.点击tab,弹出弹框; 3.点击弹框,更新tab展示,并刷新列表; 4.搜索取消事件未完成
		$scope.city = dict.city;
		$scope.salary = dict.salary;
		$scope.scale = dict.scale;
		$scope.sheets = {};
	}]);
})();

(function () {
	'use strict';
	
	// servie模式
	// angular.module('app').service('cache', ['$cookies', function ($cookies) {
	// 	this.put = function (key, value) {
	// 		$cookies.put(key, value);	
	// 	};
	// 	this.get = function (key) {
	// 		return $cookies.get(key);
	// 	};
	// 	this.remove = function (key) {
	// 		$cookies.remove(key);
	// 	};
	// }]);
	
	// 工厂模式
	angular.module('app').factory('cache', ['$cookies', function ($cookies) {
		return {
			put: function (key, value) {
				$cookies.put(key, value);
			},
			get: function (key) {
				return $cookies.get(key);
			},
			remove: function (key) {
				$cookies.remove(key);
			}
		};
	}]);

})();
(function () {
	'use strict';

	// appSheet,在html中对应app-sheet
	angular.module('app').directive('appSheet', [function () {
		return {
			restrict: 'A',
			replace: true,
			templateUrl: 'view/index/sheet.html',
			scope: {
				datas: '=',
				visible: '=',
				select: '&'
			},
			link: function (scope, iElement, iAttrs) {
				scope.cancelSheet = function() {
					scope.visible = false;
				}
			}
		};
	}]);
})();

(function () {
	'use strict';

	// appTab,在html中对应app-tab
	angular.module('app').directive('appTab', [function () {
		return {
			restrict: 'A',
			replace: true,
			templateUrl: 'view/index/tab.html',
			scope: {
				data: '=',
				tabClick: '&'
			},
			link: function (scope, iElement, iAttrs) {
				scope.selectId = scope.data[0].id;
				scope.click = function (item) {
					scope.selectId = item.id;
					scope.tabClick(item);
				};
			}
		};
	}]);
})();

(function () {
	'use strict';

	// appHead,在html中对应app-company
	angular.module('app').directive('appCompany', [function () {
		return {
			restrict: 'A',
			replace: true,
			templateUrl: 'view/job/company.html',
			scope: {
				company: '='
			},
			link: function (scope, iElement, iAttrs) {
				
			}
		};
	}]);
})();
(function () {
	'use strict';

	// appHead,在html中对应app-position-claz
	angular.module('app').directive('appPositionClaz', [function () {
		return {
			restrict: 'A',
			replace: true,
			templateUrl: 'view/job/positionClaz.html',
			scope: {
				clazes: '='
			},
			link: function (scope, iElement, iAttrs) {
				var self = this;
				scope.showCategory = function (index) {
					self.pos(scope, index);
				};
				scope.$watch('clazes', function (newVal, oldVal, _scope) {
					if(newVal){
						scope.showCategory(0);
					}
				});
			},
			pos: function (scope, index) {
				scope.positionList = scope.clazes.positionClass[index].positionList;
				scope.isActive = index;
			}
		};
	}]);
})();
(function () {
	'use strict';

	// appHead,在html中对应app-position-info
	angular.module('app').directive('appPositionInfo', [function () {
		return {
			restrict: 'A',
			replace: true,
			templateUrl: 'view/job/positionInfo.html',
			scope: {
				isActive: '=',
				isLogin: '=',
				position: '='
			},
			link: function (scope, iElement, iAttrs) {
				scope.imgPath = 'image/star'+(scope.isActive ? 'active' : '')+'.png';
			}
		};
	}]);
})();
(function () {
	'use strict';

	// appFooter,在html中对应app-footer
	angular.module('app').directive('appFooter', [function () {
		return {
			restrict: 'A',
			replace: true,
			templateUrl: 'view/template/footer.html',
			link: function (scope, iElement, iAttrs) {
				
			}
		};
	}]);
})();
(function () {
	'use strict';

	// appHead,在html中对应app-head
	angular.module('app').directive('appHead', [function () {
		return {
			restrict: 'A',
			replace: true,
			templateUrl: 'view/template/head.html',
			link: function (scope, iElement, iAttrs) {
				
			}
		};
	}]);
})();
(function () {
	'use strict';

	// appHead,在html中对应app-head-bar
	angular.module('app').directive('appHeadBar', [function () {
		return {
			restrict: 'A',
			replace: true,
			templateUrl: 'view/template/headBar.html',
			scope: {
				title: '@'
			},
			link: function (scope, iElement, iAttrs) {
				scope.back = function () {
					window.history.back();	
				};
				
				scope.$on('to-child', function (event, data) {
					console.log('to-child', event, data);
				});
				scope.$emit('to-parent', {show: 'hai'});
			}
		};
	}]);
})();
(function () {
	'use strict';

	// appPositionList,在html中对应app-position-list
	angular.module('app').directive('appPositionList', [function () {
		return {
			restrict: 'A',
			replace: true,
			templateUrl: 'view/template/positionList.html',
			// 修改scope,暴露data接口,降低模板和控制器之间的耦合
			scope: {
				data: '='
			},
			link: function (scope, iElement, iAttrs) {
				
			}
		};
	}]);
})();