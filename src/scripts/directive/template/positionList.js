(function () {
	'use strict';

	// appPositionList,在html中对应app-position-list
	angular.module('app').directive('appPositionList', [function () {
		return {
			restrict: 'A',
			replace: true,
			templateUrl: 'view/template/positionList.html',
			// 修改scope,暴露data接口,降低模板和控制器之间的耦合
			scope: {
				data: '=',
				filterObj: '=',
				claz: '='
			},
			link: function (scope, iElement, iAttrs) {
				// 处理自定义class,从接口中传入
				scope.myClaz = iAttrs.claz || '';
			}
		};
	}]);
})();
