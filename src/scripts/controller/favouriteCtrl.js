(function () {
    'use strict';

    angular.module('app').controller('favouriteCtrl', ['$scope', '$http', '$state', 'dict', function ($scope, $http, $state, dict) {
        $http.get('data/myFavorite.json').then(function (resp) {
            var data = resp.data;
            $scope.favouriteList = data;
            console.log('favourite.json data: ', data);
        });
    }]);
})();
