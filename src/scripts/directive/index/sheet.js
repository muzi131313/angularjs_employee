(function () {
	'use strict';

	// appSheet,在html中对应app-sheet
	angular.module('app').directive('appSheet', [function () {
		return {
			restrict: 'A',
			replace: true,
			templateUrl: 'view/index/sheet.html',
			scope: {
				datas: '=',
				visible: '='
			},
			link: function (scope, iElement, iAttrs) {
				
			}
		};
	}]);
})();