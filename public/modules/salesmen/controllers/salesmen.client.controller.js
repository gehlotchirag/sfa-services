'use strict';

// Salesmen controller
angular.module('salesmen').controller('SalesmenController', ['$scope', '$stateParams', '$location', 'Authentication', 'Salesmen','$http',
	function($scope, $stateParams, $location, Authentication, Salesmen, $http) {
		$scope.authentication = Authentication;
    $scope.allowCreate = true;

		// Create new Salesman
		$scope.create = function() {
			// Create new Salesman object
			var salesman = new Salesmen ({
				name: this.name,
        mobile : this.mobile
			});
			// Redirect after save
			salesman.$save(function(response) {
				$location.path('salesmen/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

    $scope.cancelTask = function() {
      $scope.allowCreate = !$scope.allowCreate;
      console.log($scope.allowCreate);
    }

		$scope.createTask = function() {
			// Create new Task object
      $http({
        url: '/task-salesmen/'+$stateParams.salesmanId,
        method: "PUT",
        data: {task: $scope.taskdata}
      }).then(function(response) {
            // success
            alert("Task Added");
            console.log(response);
          },
          function(response) { // optional
            // failed
            console.log(response);
          });
		};

		// Remove existing Salesman
		$scope.remove = function(salesman) {
			if ( salesman ) { 
				salesman.$remove();

				for (var i in $scope.salesmen) {
					if ($scope.salesmen [i] === salesman) {
						$scope.salesmen.splice(i, 1);
					}
				}
			} else {
				$scope.salesman.$remove(function() {
					$location.path('salesmen');
				});
			}
		};

		// Update existing Salesman
		$scope.update = function() {
			var salesman = $scope.salesman;

			salesman.$update(function() {
				$location.path('salesmen/' + salesman._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Salesmen
		$scope.find = function() {
			$scope.salesmen = Salesmen.query();
		};

		$scope.getTask = function(salesmenId) {
      $http({
        method: 'GET',
        url: '/task-salesmen/'+$stateParams.salesmanId
      }).then(function successCallback(response) {
        $scope.taskSalesmen = response.data;
        $scope.taskList = response.data.tasks;
        console.log("$$$$")
        console.log(response)
        console.log(response.data)
        console.log($scope.taskList)
      }, function errorCallback(errorResponse) {
        $scope.error = errorResponse.data.message;
      });

    };

    $scope.notSorted = function(obj){
      if (!obj) {
        return [];
      }
      return Object.keys(obj);
    };



    // Find existing Salesman
		$scope.findOne = function() {
			$scope.salesman = Salesmen.get({ 
				salesmanId: $stateParams.salesmanId
			});
		};
	}
]);