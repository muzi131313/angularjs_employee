(function () {
	'use strict';

	// appTab,在html中对应app-tab
	angular.module('app').directive('appTab', [function () {
		return {
			restrict: 'A',
			replace: true,
			templateUrl: 'view/index/tab.html',
			scope: {
				data: '='
			},
			link: function (scope, iElement, iAttrs) {
				scope.selectId = scope.data[0].id;
				scope.tabClick = function (item) {
					scope.selectId = item.id;
				};
			}
		};
	}]);
})();