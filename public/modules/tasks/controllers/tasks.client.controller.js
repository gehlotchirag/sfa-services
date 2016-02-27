'use strict';

angular.module('tasks').controller('TasksController', ['$scope','Salesmen',
	function($scope,Salesmen) {
		// Controller Logic
		// ...
    $scope.update = function() {
      var salesman = $scope.salesman;

      salesman.$update(function() {
        $location.path('salesmen/' + salesman._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
  }
]);