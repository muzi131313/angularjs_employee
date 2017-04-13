(function () {
	'use strict';
	
	angular.module('app', ['ui.router']);
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
		});
		$urlRouterProvider.otherwise('main');
	}]);
})();
(function () {
	'use strict';

	angular.module('app').controller('mainCtrl', ['$scope', function ($scope) {
		$scope.jobList = [{
			id: 1,
			name: 'WEB前端',
			imgSrc: 'image/company-1.png',
			companyName: '慕课网',
			city: '北京',
			industry: '互联网',
			time: '2017-04-03 10:09:08'
		}, {
			id: 2,
			name: '阿语SEM工程师',
			imgSrc: 'image/company-2.png',
			companyName: '六一集团有限公司',
			city: '北京',
			industry: '互联网',
			time: '2017-04-03 10:08:27'
		}, {
			id: 3,
			name: '产品经理',
			imgSrc: 'image/company-3.png',
			companyName: '千度',
			city: '广州',
			industry: '互联网',
			time: '2017-04-03 10:08:32'
		}];
	}]);
})();
(function () {
	'use strict';
	
	angular.module('app').controller('positionCtrl', ['$scope', function ($scope) {
		console.log('positionCtrl..');
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
				text: '@'
			},
			link: function (scope, iElement, iAttrs) {
				
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
				scope.back = function () {
					window.history.back();	
				};
			}
		};
	}]);
})();
(function () {
	'use strict';
	
	var CityService = {
		init: function () {
			console.log('CityService');
		}
	};
	
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
				data: '='
			},
			link: function (scope, iElement, iAttrs) {
				
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
				isActive: '='
			},
			link: function (scope, iElement, iAttrs) {
				scope.imgPath = 'image/star'+(scope.isActive ? 'active' : '')+'.png';
			}
		};
	}]);
})();