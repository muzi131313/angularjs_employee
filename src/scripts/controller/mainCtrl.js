(function () {
	'use strict';

	angular.module('app').controller('mainCtrl', ['$scope', function ($scope) {
		$scope.jobList = [{
			id: 1,
			name: 'WEB前端',
			imgSrc: 'image/company-1.png',
			companyName: '慕课网',
			city: '北京',
			industry: '互联网',
			time: '2017-04-03 10:09:08'
		}, {
			id: 2,
			name: '阿语SEM工程师',
			imgSrc: 'image/company-2.png',
			companyName: '六一集团有限公司',
			city: '北京',
			industry: '互联网',
			time: '2017-04-03 10:08:27'
		}, {
			id: 3,
			name: '产品经理',
			imgSrc: 'image/company-3.png',
			companyName: '千度',
			city: '广州',
			industry: '互联网',
			time: '2017-04-03 10:08:32'
		}];
	}]);
})();