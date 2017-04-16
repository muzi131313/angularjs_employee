(function () {
	'use strict';

	// appHead,在html中对应app-position-claz
	angular.module('app').directive('appPositionClaz', [function () {
		return {
			restrict: 'A',
			replace: true,
			templateUrl: 'view/job/positionClaz.html',
			scope: {
				clazes: '='
			},
			link: function (scope, iElement, iAttrs) {
				var self = this;
				scope.showCategory = function (index) {
					self.pos(scope, index);
				};
				scope.$watch('clazes', function (newVal, oldVal, _scope) {
					if(newVal){
						scope.showCategory(0);
					}
				});
			},
			pos: function (scope, index) {
				scope.positionList = scope.clazes.positionClass[index].positionList;
				scope.isActive = index;
			}
		};
	}]);
})();