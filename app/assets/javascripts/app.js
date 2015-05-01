angular
    .module('limitedBandwith', [
  'ui.router',
  'templates'
]).config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider.state('home', {
    url:'/',
    templateUrl:'home.html',
    controller:'HomeCtrl'
  });
  // default fall back route
  $urlRouterProvider.otherwise('/');
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