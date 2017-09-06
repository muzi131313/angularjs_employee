(function () {
    'use strict';

    angular.module('app').controller('postCtrl', ['$scope', '$http', '$state', 'dict', function ($scope, $http, $state, dict) {
        $scope.tabClick = function (id, name) {

        }
        $scope.tabs = [{
            id: 'all',
            name: '全部'
        }, {
            id: 'pass',
            name: '面试邀请'
        }, {
            id: 'fail',
            name: '不合适'
        }]
        $http.get('data/myPost.json').then(function (resp) {
            var data = resp.data;
            $scope.postList = data;
            console.log('resp data: ', data);
        }, function (err) {
            console.log('myPost.json exists error: ', err);
        });

        $scope.tabClick = function (id, name) {
            console.log(id, name);
            var filterObj = $scope.filterObj;
            switch (id) {
                case 'all':
                    delete filterObj.state;
                    break;
                case 'pass':
                    filterObj.state = '1';
                    break;
                case 'fail':
                    filterObj.state = '-1';
                    break;
            }
        }
        $scope.filterObj = {}
    }]);
})();
