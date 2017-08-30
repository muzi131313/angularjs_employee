(function () {
	'use strict';

	angular.module('app').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
		$stateProvider
		.state('main', {
			url: '/main',
			templateUrl: 'view/main.html',
			controller: 'mainCtrl'
		})
		.state('position', {
			url: '/position/:id',
			templateUrl: 'view/position.html',
			controller: 'positionCtrl'
		})
		.state('company', {
			url: '/company/:id',
			templateUrl: 'view/company.html',
			controller: 'companyCtrl'
		})
		.state('search', {
			url: '/search',
			templateUrl: 'view/search.html',
			controller: 'searchCtrl'
		})
		.state('my', {
			url: '/my',
			templateUrl: 'view/my.html',
			controller: 'myCtrl'
		})

		// 登录用户模块
		.state('favourite', {
			url: '/favourite',
			templateUrl: 'view/user/favourite.html',
			controller: 'favouriteCtrl'
		}).state('login', {
			url: '/login',
			templateUrl: 'view/user/login.html',
			controller: 'loginCtrl'
		}).state('person', {
			url: '/person',
			templateUrl: 'view/user/person.html',
			controller: 'personCtrl'
		}).state('post', {
			url: '/post',
			templateUrl: 'view/user/post.html',
			controller: 'postCtrl'
		}).state('register', {
			url: '/register',
			templateUrl: 'view/user/register.html',
			controller: 'registerCtrl'
		});
		$urlRouterProvider.otherwise('main');
	}]);
})();
