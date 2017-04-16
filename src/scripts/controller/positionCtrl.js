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