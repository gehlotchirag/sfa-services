'use strict';

angular.module('appsetup').controller('AppsetupController', ['$scope','$http','Authentication','$sce',
	function($scope,$http,Authentication,$sce) {
    $scope.authentication = Authentication;
    $scope.companyId =  $scope.authentication.user.companyId;
    $scope.frameName = 'foo';
    $scope.frameUrl = 'modules/appsetup/views/frame.html#'+$scope.companyId;
    $http.get('../../../AppFolder/'+$scope.companyId+'/app.html').then(function(response) {
      $scope.htmlcontent = response.data;
    });

    $scope.loadMobile = function(name) {
      console.log(name)
      //$scope.frameUrl = $sce.trustAsResourceUrl('modules/appsetup/views/frame.html#'+name);
      $scope.frameUrl = $sce.trustAsResourceUrl('modules/appsetup/views/frame.html#'+name);

      //$scope.frameUrl = 'modules/appsetup/views/frame.html#'+name;
    }

	}
]);