(function () {
	'use strict';

	// appPositionList,在html中对应app-position-list
	angular.module('app').directive('appPositionList', ['$http', function ($http) {
		return {
			restrict: 'A',
			replace: true,
			templateUrl: 'view/template/positionList.html',
			// 修改scope,暴露data接口,降低模板和控制器之间的耦合
			scope: {
				data: '=',
				filterObj: '=',
				claz: '=',
				isFavourite: '='
			},
			link: function (scope, iElement, iAttrs) {
				// 处理自定义class,从接口中传入
				scope.myClaz = iAttrs.claz || '';
				if (iAttrs.isFavourite) {
					// 组件内,搜藏点击事件
					scope.select = function (item) {
						$http.post('data/favorite.json', {
							id: item.id,
							select: !item.select
						}).then(function (resp) {
							var data = resp.data;
							item.select = !item.select;
						});
					}
				}
			}
		};
	}]);
})();
