'use strict';

// appHead,在html中对应app-head
angular.module('app').directive('appHead', [function () {
	return {
		restrict: 'A',
		replace: true,
		templateUrl: 'view/template/head.html',
		link: function (scope, iElement, iAttrs) {
			
		}
	};
}]);