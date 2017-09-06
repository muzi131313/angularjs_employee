(function () {
	'use strict';

	// appHead,在html中对应app-head
	angular.module('app').directive('appHead', ['cache', function (cache) {
		return {
			restrict: 'A',
			replace: true,
			templateUrl: 'view/template/head.html',
			link: function (scope, iElement, iAttrs) {
				scope.name = cache.get('name') || '';
			}
		};
	}]);
})();
