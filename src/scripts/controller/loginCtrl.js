(function () {
    'use strict';

    angular.module('app').controller('loginCtrl', ['cache', '$scope', '$http', '$state', 'dict', function (cache, $scope, $http, $state, dict) {
        $scope.submit = function () {
            $http.post('data/login.json', $scope.user)
            .then(function (resp) {
                var data = resp.data;
                cache.put('id', data.id);
                cache.put('name', data.name);
                cache.put('image', data.image);
                $state.go('main');
            }, function (e) {
                console.log('submit() exists error: ', e);
            });
        }
    }]);
})();
