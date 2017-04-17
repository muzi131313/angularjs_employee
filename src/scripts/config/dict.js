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