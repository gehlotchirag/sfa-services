'use strict';

angular.module('tackings').controller('TrackingsController', ['$scope','$timeout',
	function($scope,$timeout) {
		// Controller Logic
		// ...
    $scope.today = true;
    $scope.makeFalse = function() {
      $timeout(function () {
        $scope.render = false;
      }, 1000);
    }
    $scope.directions = {origin:"Malad west, Mumbai", destination:"Kandivali west, Mumbai"};
    $scope.directions2 = {origin:"Borivali west, Mumbai", destination:"Malad west, Mumbai"};

    $scope.wayPoints = [
      {location: {lat:19.19000, lng: 72.85524}, stopover: true},
      {location: {lat:19.18024, lng: 72.85541}, stopover: true}
     ];
  }
]);