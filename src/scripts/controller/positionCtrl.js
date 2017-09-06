(function () {
	'use strict';

	angular.module('app').controller('positionCtrl', ['$log', '$scope', '$http', '$state', '$q', 'cache', function ($log, $scope, $http, $state, $q, cache) {

		var positionId = $state.params.id;

		$scope.isLogin = cache.get('name') ? true : false;
		$scope.isActive = false;

		cache.put('key', 'day');
		$scope.message = $scope.isLogin ? '投个简历' : '去登录';

		$scope.go = function (isLogin) {
			if (isLogin) {
				if ($scope.message != '已投递') {
					$http.post('data/handle.json', {
						id: $scope.position.id
					})
					.then(function (resp) {
						var data = resp.data;
						$log.log('handle result(): ', data);
						$scope.message = '已投递';
					});
				} else {
					console.log('请勿重复投递');
				}
			} else {	// 去登录
				$state.go('login');
			}
		}

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
				var data = resp.data;
				$scope.position = data;
				if (data.posted) {
					$scope.message = '已投递';
				}
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
