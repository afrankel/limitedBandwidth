angular.module('limitedBandwidth')
    .controller('Option2Ctrl', ['$scope', '$http', function ($scope, $http) {

  $scope.apicalls = []; // storage for my api call results

  var currTime = new Date().getTime(); // unique-ish for this client

  // loop through n times to call my api
  for (var i = 0; i < 10; i++) {
    $scope.apicalls[i] = {'result':'Started'};

    (function (cntr) { // need function closure here to pass in i

      $http.get('api_call_with_id.json?t=10&id=' + currTime + (parseInt(i)+1)).
        success(function (data, i) { // call api that does some work (i.e., sleeps for a bit)
          $scope.apicalls[cntr].result = data;
        }).
        error(function (data, status, headers, config) {
          $scope.apicalls[cntr].result = status; // just set the status on the page so we can see
        });
    })(i);
  }
}]);