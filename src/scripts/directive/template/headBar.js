(function () {
	'use strict';

	// appHead,在html中对应app-head-bar
	angular.module('app').directive('appHeadBar', [function () {
		return {
			restrict: 'A',
			replace: true,
			templateUrl: 'view/template/headBar.html',
			scope: {
				title: '@'
			},
			link: function (scope, iElement, iAttrs) {
				scope.back = function () {
					window.history.back();	
				};
				
				scope.$on('to-child', function (event, data) {
					console.log('to-child', event, data);
				});
				scope.$emit('to-parent', {show: 'hai'});
			}
		};
	}]);
})();