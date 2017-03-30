'use strict'

angular.module('app', ['ui.router']);
'use strict';

angular.module('app').controller('mainCtrl', ['$scope', function ($scope) {
	
}]);
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
var CityService = {
	init: function () {
		console.log('CityService');
	}
}
'use strict'

angular.module('app').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	$stateProvider.state('main', {
		url: '/main',
		templateUrl: 'view/main.html',
		controller: 'mainCtrl'
	})
	$urlRouterProvider.otherwise('main');
}]);