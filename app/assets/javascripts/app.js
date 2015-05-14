angular
    .module('limitedBandwidth', [
  'ui.router',
  'templates'
]).config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
  function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider.state('option1', {
      url:'/option1',
      templateUrl:'option1.html',
      controller:'Option1Ctrl'
    }).
        state('option2', {
          url:'/option2',
          templateUrl:'option2.html',
          controller:'Option2Ctrl'
        });

    // default fall back route
    $urlRouterProvider.otherwise('/option1');
    //$locationProvider.html5Mode(true);
    var interceptor = ['$injector', '$q', '$timeout', function ($injector, $q, $timeout) {
      return {
        'responseError':function (response) {
          if (response.status === 0) { // this is a timeout or connection lost
            // should retry
            return $timeout(function () { // retry after 1 second
              // wait
            }, 1000)
            .then(function () {
              var $http = $injector.get('$http');
              if (response.config.url.indexOf("retry=true") == -1) {
                response.config.url = response.config.url + '&retry=true';
              }
              return $http(response.config);
            });
          }
          // give up - some other error
          return $q.reject(response);
        }
      };
    }];

    $httpProvider.interceptors.push(interceptor);
  }

]);