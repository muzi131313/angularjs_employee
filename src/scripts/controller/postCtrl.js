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
        $scope.postList = [{

        }]
    }]);
})();
