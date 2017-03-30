'use strict';

// appFooter,在html中对应app-footer
angular.module('app').directive('appFooter', [function () {
	return {
		restrict: 'A',
		replace: true,
		templateUrl: 'view/template/footer.html',
		link: function (scope, iElement, iAttrs) {
			
		}
	};
}]);