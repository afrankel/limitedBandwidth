angular
    .module('limitedBandwith', [
        'ui.router',
        'templates'
    ]).config(function ($stateProvider, $urlRouterProvider) {
      $stateProvider.state('home', {
        url: '/',
        templateUrl : 'home.html',
        controller: 'HomeCtrl'
      });
      // default fall back route
      $urlRouterProvider.otherwise('/');
      //$locationProvider.html5Mode(true);
    });