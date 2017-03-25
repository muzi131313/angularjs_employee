'use strict'

angular.module('app', ['ui.router']);
'use strict'

angular.module('app').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	$stateProvider.state('main', {
		url: '/main',
		templateUrl: 'view/main.html',
		controller: 'mainCtrl'
	})
	$urlRouterProvider.otherwise('main');
}]);
var CityService = {
	init: function () {
		console.log('CityService');
	}
}