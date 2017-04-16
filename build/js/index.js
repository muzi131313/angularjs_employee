(function () {
	'use strict';
	
	angular.module('app', ['ui.router', 'ngCookies']);
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
		}, function (resp) {
			
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
	
	angular.module('app').controller('searchCtrl', ['$scope', '$http', '$state', function ($scope, $http, $state) {
		
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