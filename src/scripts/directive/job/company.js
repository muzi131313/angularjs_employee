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