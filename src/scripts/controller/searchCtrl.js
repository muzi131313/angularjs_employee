(function () {
	'use strict';
	
	angular.module('app').controller('searchCtrl', ['$scope', '$http', '$state', 'dict', function ($scope, $http, $state, dict) {
		/**
		 * [filterData 数据过滤（模拟后台查询数据）]
		 * @param  {[type]} data      [要过滤的数据]
		 * @param  {[type]} fuzzyName [模糊查询的名字]
		 * @param  {[type]} params    [参数: {cityName: '', jobName: '', salarayName: ''}]
		 * @return {[type]}           [description]
		 */
		function filterData(data, fuzzyName, params) {
			data = data || [];
			var hasCity,
				cityName,
				hasJob,
				jobName,
				hasSalary,
				salaryName;
			data = data.filter(function (item, index) {
				cityName = jobName = salaryName = '';
				if(params && Object.keys(params).length){
					if(params.cityName) cityName = params.cityName;
					if(params.jobName) jobName = params.jobName;
					if(params.salaryName) salaryName = params.salaryName;
				}

				if(fuzzyName) cityName = jobName = salaryName = fuzzyName;

				hasCity = ~item.cityName.indexOf(fuzzyName) ? true : false;
				hasJob = ~item.job.indexOf(fuzzyName) ? true : false;
				hasSalary = ~item.salaryName.indexOf(fuzzyName) ? true : false;

				return hasCity || hasJob || hasSalary;
			});
			return data;
		}

		/**
		 * [queryJob 工作查询]
		 * @param  {[type]} name   [description]
		 * @param  {[type]} params [description]
		 * @return {[type]}        [description]
		 */
		function queryJob(name, params) {
			$http({
				method: 'GET',
	  			url: '/data/positionList.json',
	  			params: (params || {})
			}).then(function (resp) {
				var data = resp.data;
				filterData(data, name, params);
				$scope.jobList = resp.data;
			}, function (resp) {
				
			});
		}

		/**
		 * [search 搜索事件]
		 * @return {[type]} [description]
		 */
		$scope.search = function () {
			queryJob($scope.name, {
				jobName: $scope.jobName,
				cityName: $scope.cityName,
				salarayName: $scope.salarayName
			});
		};
		/**
		 * [cancel 取消事件]
		 * @return {[type]} [description]
		 */
		$scope.cancel = function () {
			// console.log('cancel...');
			$scope.name = '';
			$scope.jobName = '';
			$scope.cityName = '';
			$scope.salarayName = '';
			$scope.search();
		};

		// init event
		$scope.search();
		$scope.tabs = dict.searchTabs;
		// TODO: 1.初始化弹框数据; 2.点击tab,弹出弹框; 3.点击弹框,更新tab展示,并刷新列表; 4.搜索取消事件未完成
		$scope.city = dict.city;
		$scope.salary = dict.salary;
		$scope.scale = dict.scale;
	}]);
})();