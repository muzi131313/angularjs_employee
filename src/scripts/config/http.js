(function () {
    'use strict';

    angular.module('app').config(['$provide',function($provide) {
        /**
         * [装饰器模式,把post请求改成get请求]
         * @Author   liyanfeng
         * @DateTime 2017-08-30T22:04:03+0800
         * @param    {[type]}                 $delegate [description]
         * @param    {[type]}                 $q)       {                             var get [description]
         * @param    {[type]}                 error:    function      (cb) {                                           def.promise.then(null, cb);                    }                }            }        }] [description]
         * @return   {[type]}                           [description]
         */
        $provide.decorator('$http', ['$delegate', '$q', function ($delegate, $q) {
            $delegate.post = function (url, data, config) {
                var def = $q.defer();
                // 1.6.3版本, 使用then/catch方式,废弃了success/error方法
                $delegate.get(url).then(function (resp) {
                    def.resolve(resp);
                }).catch(function (err) {
                    def.reject(err);
                });
                return {
                    success: function (cb) {
                        def.promise.then(cb);
                    },
                    error: function (cb) {
                        def.promise.then(null, cb);
                    }
                }
            }
            return $delegate; // 记得return $delegate, 否则什么也没有了
        }]);
    }])
})();
