'use strict';

angular.module('app').filter('filterByObj', [function () {
    return function (list, obj) {
        var result = [];
        if (!list) return result;
        // console.log('params: ', list, obj);
        angular.forEach(list, function (item) {
            var isEqual = true;
            for (var e in obj) {
                // console.log('item, obj[e]', item, obj[e]);
                if (item[e] !== obj[e]) {
                    isEqual = false;
                }
            }
            if (isEqual) {
                result.push(item);
            }
        });
        console.log('result: ', result);
        return result;
    }
}]);
