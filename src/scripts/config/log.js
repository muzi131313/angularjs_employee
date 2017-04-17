(function(){
	'use strict';

	/**
	 * copy from: https://github.com/ShuyunXIANFESchool/FE-problem-collection/issues/21
	 
	// 注意注入的时候，加上Provider后缀
	angular.module('app').config(function(messageProvider) {
	     messageProvider.setLevel('error');
	});

	//注入的时候，无需加后缀
	angular.module('app').controller('MainCtrl', function(message) {
	     message.error('just a test');
	});

	 */
	angular.module('app').provider('message', message.bind(message));
	function message() {
        var level = 'log';
    }
    // 该方法可以在 config 阶段使用
    message.prototype.setLevel = function (level) {
    	level = level;
    };
    // 该方法返回的对象方法可以在 run 阶段使用
    message.prototype.$get = function () {
    	return {
            log: function() {
                if(level ===  'log'){
                	console.log(arguments);
                }else{
					angular.noop();
                }
            },
            error: function() {
            	if(level ===  'error'){
                	console.error(arguments);
                }else{
					angular.noop();
                }
            },
            warn: function() {
            	if(level ===  'error'){
                	console.warn(arguments);
                }else{
					angular.noop();
                }
            }
        };
    };
})();