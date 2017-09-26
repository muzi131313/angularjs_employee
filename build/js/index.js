(function () {
	'use strict';

	angular.module('app', ['ui.router', 'ngCookies', 'validation', 'ngAnimate']);
})();

(function () {
	'use strict';

	// value: 创建全局变量
	angular.module('app').value('dict', {}).run(['$http', 'dict', function ($http, dict) {
		
		// 城市
		$http({
			method: 'GET',
  			url: '/data/city.json'
		}).then(function (resp) {
			dict.city = resp;
		}, function (resp) {
			
		});

		// 薪资
		$http({
			method: 'GET',
  			url: '/data/salary.json'
		}).then(function (resp) {
			dict.salary = resp;
		}, function (resp) {
			
		});

		// 范围
		$http({
			method: 'GET',
  			url: '/data/scale.json'
		}).then(function (resp) {
			dict.scale = resp;
		}, function (resp) {
			
		});

		// tab标题
		dict.searchTabs = [{
			id: 'city', 
			name: '城市'
		}, {
			id: 'salary',
			name: '薪资'
		}, {
			id: 'scale',
			name: '公司规模'
		}];
	}]);
})();
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
                }, function (err) {
                    def.reject(err);
                });
                return def.promise;
                // {
                //     then: function (cb) {
                //         def.promise.then(cb);
                //     },
                //     catch: function (cb) {
                //         def.promise.then(null, cb);
                //     }
                // }
            }
            return $delegate; // 记得return $delegate, 否则什么也没有了
        }]);
    }])
})();

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
(function () {
	'use strict';

	angular.module('app').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
		$stateProvider
		.state('main', {
			url: '/main',
			templateUrl: 'view/main.html',
			controller: 'mainCtrl'
		})
		.state('position', {
			url: '/position/:id',
			templateUrl: 'view/position.html',
			controller: 'positionCtrl'
		})
		.state('company', {
			url: '/company/:id',
			templateUrl: 'view/company.html',
			controller: 'companyCtrl'
		})
		.state('search', {
			url: '/search',
			templateUrl: 'view/search.html',
			controller: 'searchCtrl'
		})
		.state('my', {
			url: '/my',
			templateUrl: 'view/my.html',
			controller: 'myCtrl'
		})

		// 登录用户模块
		.state('favourite', {
			url: '/favourite',
			templateUrl: 'view/user/favourite.html',
			controller: 'favouriteCtrl'
		}).state('login', {
			url: '/login',
			templateUrl: 'view/user/login.html',
			controller: 'loginCtrl'
		}).state('person', {
			url: '/person',
			templateUrl: 'view/user/person.html',
			controller: 'personCtrl'
		}).state('post', {
			url: '/post',
			templateUrl: 'view/user/post.html',
			controller: 'postCtrl'
		}).state('register', {
			url: '/register',
			templateUrl: 'view/user/register.html',
			controller: 'registerCtrl'
		});
		$urlRouterProvider.otherwise('main');
	}]);
})();

(function () {
    'use strict';
    angular.module('app').config(['$validationProvider', function($validationProvider) {
        var expression = {
            phone: /^1[\d]{10}/,
            password: function (value) {
                return (value + '').length > 5;
            },
            required: function (value) {
                return !!value;
            }
        };
        var defaultMsg = {
            phone: {
                success: '',
                error: '必须是11位手机号'
            },
            password: {
                success: '',
                error: '长度至少6位'
            },
            required: {
                sccess: '',
                error: '不能为空'
            }
        };
        $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
    }])
})();

(function () {
	'use strict';

	angular.module('app').controller('companyCtrl', ['$scope', '$http', '$state', function ($scope, $http, $state) {

		var companyId = $state.params.id;

		$http({
			method: 'GET',
  			url: '/data/company.json',
  			params: {
  				companyId: companyId
  			}
		}).then(function (resp) {
			$scope.company = resp.data;

			$scope.$broadcast('to-child', {word: 'world!'});

		}, function (resp) {

		});

		$scope.$on('to-parent', function (event, data) {
			console.log('to-parent', event, data);
		});
	}]);
})();

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

(function () {
	'use strict';

	angular.module('app').controller('mainCtrl', ['$scope', '$http', function ($scope, $http) {
		$http({
			method: 'GET',
  			url: '/data/positionList.json'
		}).then(function (resp) {
			$scope.jobList = resp.data;
		}, function (err) {
			
		});
	}]);
})();
(function () {
	'use strict';
	
	angular.module('app').controller('myCtrl', ['$scope', '$http', '$state', function ($scope, $http, $state) {
		
	}]);
})();
(function () {
    'use strict';

    angular.module('app').controller('personCtrl', ['cache', '$scope', '$http', '$state', 'dict', function (cache, $scope, $http, $state, dict) {
        if (cache.get('name')) {
            $scope.name = cache.get('name');
            $scope.image = cache.get('image');
        }
        $scope.logout = function () {
            cache.remove('id');
            cache.remove('name');
            cache.remove('image');
            $state.go('main');
        }
    }]);
})();

(function () {
	'use strict';

	angular.module('app').controller('positionCtrl', ['$log', '$scope', '$http', '$state', '$q', 'cache', function ($log, $scope, $http, $state, $q, cache) {

		var positionId = $state.params.id;

		$scope.isLogin = cache.get('name') ? true : false;
		$scope.isActive = false;

		cache.put('key', 'day');
		$scope.message = $scope.isLogin ? '投个简历' : '去登录';

		$scope.go = function (isLogin) {
			if (isLogin) {
				if ($scope.message != '已投递') {
					$http.post('data/handle.json', {
						id: $scope.position.id
					})
					.then(function (resp) {
						var data = resp.data;
						$log.log('handle result(): ', data);
						$scope.message = '已投递';
					});
				} else {
					console.log('请勿重复投递');
				}
			} else {	// 去登录
				$state.go('login');
			}
		}

		// position
		function getPosition() {
			var def = $q.defer();
			$http({
				method: 'GET',
				url: '/data/position.json',
				params: {
					positionId: positionId
				}
			}).then(function (resp) {
				var data = resp.data;
				$scope.position = data;
				if (data.posted) {
					$scope.message = '已投递';
				}
				def.resolve(resp);
			}, function (err) {
				def.reject(err);
			});
			return def.promise;
		}

		// company
		function getCompany(companyId) {
			var def = $q.defer();
			$http({
				method: 'GET',
	  			url: '/data/company.json',
	  			params: {
	  				companyId: companyId
	  			}
			}).then(function (resp) {
				$scope.company = resp.data;
				def.resolve(resp);
			}, function (err) {
				def.reject(err);
			});
			return def.promise;
		}

		getPosition().then(function (data) {
			getCompany(data.data.companyId);
		});
	}]);
})();

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

(function () {
    'use strict';

    // $interval,使用系统的interval,如果使用系统的,有可能导致ng-model不刷新,或者刷新失败
    angular.module('app').controller('registerCtrl', ['$scope', '$http', '$state', 'dict', '$interval', function ($scope, $http, $state, dict, $interval) {
        $scope.user = {};
        $scope.mySubmit = function () {
            console.log('$scope.user: ', $scope.user)
            $http
            .post('data/regist.json', $scope.user)
            .then(function (resp) {
                $state.go('login');
            }, function (e) {
                console.log('regist.json exists error: ', e);
            });
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
            }, function (e) {
                console.log('get code.json exists error: ', e)
            });
        }
    }]);

})();

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
			// console.log('name and params: ', name, params);
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

		/**
		 * [tabClick tab点击事件]
		 * @param  {[type]} item [description]
		 * @return {[type]}      [description]
		 */
		$scope.tabClick = function(id, name) {
			console.log('tab click item: ', id, name, dict);
			$scope.sheets.list = dict[id].data;
			$scope.sheets.visible = true;
			$scope.tabId = id;
		}

		/**
		 * [select 选择框选中事件]
		 * @param  {[type]} item [description]
		 * @return {[type]}      [description]
		 */
		$scope.selectClick = function(id, name) {
			var tabId = $scope.tabId;
			console.log('selectClick item: ', id, name, tabId);
			// 点击之后，tab的文字发生变化
			if (id) {
				angular.forEach($scope.tabs, function (item) {
					if (item.id == tabId) {
						item.name = name;
					}
				});
				$scope.filterObj[tabId + 'Id'] = id;
			} else {
				delete $scope.filterObj[tabId + 'Id'];
				angular.forEach($scope.tabs, function (item) {
					if (item.id == tabId) {
						switch(item.id){
							case 'city':
								item.name = '城市';
								break;
							case 'salary':
								item.name = '薪水';
								break;
							case 'scale':
								item.name = '公司规模';
								break;
						}
					}
				});
			}
		}

		// init event
		$scope.search();
		$scope.tabs = dict.searchTabs;
		// TODO: 1.初始化弹框数据; 2.点击tab,弹出弹框; 3.点击弹框,更新tab展示,并刷新列表; 4.搜索取消事件未完成
		$scope.city = dict.city;
		$scope.salary = dict.salary;
		$scope.scale = dict.scale;
		$scope.sheets = {};
		$scope.filterObj = {};
	}]);
})();

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

(function () {
	'use strict';
	
	// servie模式
	// angular.module('app').service('cache', ['$cookies', function ($cookies) {
	// 	this.put = function (key, value) {
	// 		$cookies.put(key, value);	
	// 	};
	// 	this.get = function (key) {
	// 		return $cookies.get(key);
	// 	};
	// 	this.remove = function (key) {
	// 		$cookies.remove(key);
	// 	};
	// }]);
	
	// 工厂模式
	angular.module('app').factory('cache', ['$cookies', function ($cookies) {
		return {
			put: function (key, value) {
				$cookies.put(key, value);
			},
			get: function (key) {
				return $cookies.get(key);
			},
			remove: function (key) {
				$cookies.remove(key);
			}
		};
	}]);

})();
(function () {
	'use strict';

	// appFooter,在html中对应app-footer
	angular.module('app').directive('appFooter', [function () {
		return {
			restrict: 'A',
			replace: true,
			templateUrl: 'view/template/footer.html',
			link: function (scope, iElement, iAttrs) {
				
			}
		};
	}]);
})();
(function () {
	'use strict';

	// appHead,在html中对应app-head
	angular.module('app').directive('appHead', ['cache', function (cache) {
		return {
			restrict: 'A',
			replace: true,
			templateUrl: 'view/template/head.html',
			link: function (scope, iElement, iAttrs) {
				scope.name = cache.get('name') || '';
			}
		};
	}]);
})();

(function () {
	'use strict';

	// appHead,在html中对应app-head-bar
	angular.module('app').directive('appHeadBar', [function () {
		return {
			restrict: 'A',
			replace: true,
			templateUrl: 'view/template/headBar.html',
			scope: {
				title: '@'
			},
			link: function (scope, iElement, iAttrs) {
				scope.back = function () {
					window.history.back();	
				};
				
				scope.$on('to-child', function (event, data) {
					console.log('to-child', event, data);
				});
				scope.$emit('to-parent', {show: 'hai'});
			}
		};
	}]);
})();
(function () {
	'use strict';

	// appPositionList,在html中对应app-position-list
	angular.module('app').directive('appPositionList', ['$http', function ($http) {
		return {
			restrict: 'A',
			replace: true,
			templateUrl: 'view/template/positionList.html',
			// 修改scope,暴露data接口,降低模板和控制器之间的耦合
			scope: {
				data: '=',
				filterObj: '=',
				claz: '=',
				isFavourite: '='
			},
			link: function (scope, iElement, iAttrs) {
				// 处理自定义class,从接口中传入
				scope.myClaz = iAttrs.claz || '';
				if (iAttrs.isFavourite) {
					// 组件内,搜藏点击事件
					scope.select = function (item) {
						$http.post('data/favorite.json', {
							id: item.id,
							select: !item.select
						}).then(function (resp) {
							var data = resp.data;
							item.select = !item.select;
						});
					}
				}
			}
		};
	}]);
})();

(function () {
	'use strict';

	// appSheet,在html中对应app-sheet
	angular.module('app').directive('appSheet', [function () {
		return {
			restrict: 'A',
			replace: true,
			templateUrl: 'view/index/sheet.html',
			scope: {
				datas: '=',
				visible: '=',
				select: '&'
			},
			link: function (scope, iElement, iAttrs) {
				scope.cancelSheet = function() {
					scope.visible = false;
				}
			}
		};
	}]);
})();

(function () {
	'use strict';

	// appTab,在html中对应app-tab
	angular.module('app').directive('appTab', [function () {
		return {
			restrict: 'A',
			replace: true,
			templateUrl: 'view/index/tab.html',
			scope: {
				data: '=',
				tabClick: '&'
			},
			link: function (scope, iElement, iAttrs) {
				scope.selectId = scope.data[0].id;
				scope.click = function (item) {
					scope.selectId = item.id;
					scope.tabClick(item);
				};
			}
		};
	}]);
})();

(function () {
	'use strict';

	// appHead,在html中对应app-company
	angular.module('app').directive('appCompany', [function () {
		return {
			restrict: 'A',
			replace: true,
			templateUrl: 'view/job/company.html',
			scope: {
				company: '='
			},
			link: function (scope, iElement, iAttrs) {
				
			}
		};
	}]);
})();
(function () {
	'use strict';

	// appHead,在html中对应app-position-claz
	angular.module('app').directive('appPositionClaz', [function () {
		return {
			restrict: 'A',
			replace: true,
			templateUrl: 'view/job/positionClaz.html',
			scope: {
				clazes: '='
			},
			link: function (scope, iElement, iAttrs) {
				var self = this;
				scope.showCategory = function (index) {
					self.pos(scope, index);
				};
				scope.$watch('clazes', function (newVal, oldVal, _scope) {
					if(newVal){
						scope.showCategory(0);
					}
				});
			},
			pos: function (scope, index) {
				scope.positionList = scope.clazes.positionClass[index].positionList;
				scope.isActive = index;
			}
		};
	}]);
})();
(function () {
	'use strict';

	// appHead,在html中对应app-position-info
	angular.module('app').directive('appPositionInfo', ['$http', function ($http) {
		return {
			restrict: 'A',
			replace: true,
			templateUrl: 'view/job/positionInfo.html',
			scope: {
				isActive: '=',
				isLogin: '=',
				position: '='
			},
			link: function (scope, iElement, iAttrs) {
				scope.imgPath = 'image/star'+(scope.isActive ? 'active' : '')+'.png';
				scope.getInMyFavorite = function (item) {
					$http.post('data/favorite.json', {
						id: item.id,
						select: item.select
					})
					.then(function (resp) {
						var data = resp.data;
						console.log('item: ', item);
						scope.isActive = !scope.isActive;
						scope.imgPath = 'image/star'+(scope.isActive ? '-active' : '')+'.png';
					});
				}
			}
		};
	}]);
})();
