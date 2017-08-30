(function () {
    'use strict';

    // $interval,使用系统的interval,如果使用系统的,有可能导致ng-model不刷新,或者刷新失败
    angular.module('app').controller('registerCtrl', ['$scope', '$http', '$state', 'dict', '$interval', function ($scope, $http, $state, dict, $interval) {
        $scope.user = {};
        $scope.mySubmit = function () {
            console.log('$scope.user: ', $scope.user)
        }
        var count = 60;
        $scope.sendMsgCode = function () {
            $http({
                method: 'GET',
                url: 'data/code.json',
                params: {}
            }).then(function (resp) {
                if (1 === +resp.data.state) {
                    count = 60;
                    var timer = $interval(function () {
                        if (count <= 0) {
                            $interval.cancel(timer);
                            $scope.time = '';
                            return;
                        }
                        count--;
                        $scope.time = count + 's';
                    }, 1e3);
                }
            })
            .catch(function (e) {
                console.log('get code.json exists error: ', e)
            });
        }
    }]);

})();
