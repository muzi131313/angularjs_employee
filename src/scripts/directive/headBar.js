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