(function () {
	'use strict';

	// appHead,在html中对应app-position-info
	angular.module('app').directive('appPositionInfo', ['$http', function ($http) {
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
				scope.getInMyFavorite = function (item) {
					$http.post('data/favorite.json', {
						id: item.id,
						select: item.select
					})
					.then(function (resp) {
						var data = resp.data;
						console.log('item: ', item);
						scope.isActive = !scope.isActive;
						scope.imgPath = 'image/star'+(scope.isActive ? '-active' : '')+'.png';
					});
				}
			}
		};
	}]);
})();
