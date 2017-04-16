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