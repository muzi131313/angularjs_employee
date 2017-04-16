(function () {
	'use strict';

	// appHead,在html中对应app-position-info
	angular.module('app').directive('appPositionInfo', [function () {
		return {
			restrict: 'A',
			replace: true,
			templateUrl: 'view/job/positionInfo.html',
			scope: {
				isActive: '=',
				isLogin: '=',
				position: '='
			},
			link: function (scope, iElement, iAttrs) {
				scope.imgPath = 'image/star'+(scope.isActive ? 'active' : '')+'.png';
			}
		};
	}]);
})();