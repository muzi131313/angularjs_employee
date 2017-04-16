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