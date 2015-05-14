angular
    .module('limitedBandwidth', [
  'ui.router',
  'templates'
]).config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
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
  var interceptor = ['$injector', '$q', function ($injector, $q) {
    return {
      'responseError': function(response) {
        if (response.status === 0) { // this is a timeout or connection lost
          // should retry
          return setTimeout(function(){ // retry after 1 second
            var $http = $injector.get('$http');
            return $http(response.config);
          }, 1000);
        }
        // give up - some other error
        return $q.reject(response);
      }
    };
  }];

  $httpProvider.interceptors.push(interceptor);
}

]);