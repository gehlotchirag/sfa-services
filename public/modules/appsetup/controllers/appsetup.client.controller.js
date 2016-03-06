'use strict';

angular.module('appsetup').controller('AppsetupController', ['$scope','$http','Authentication','$sce','AppHtml','$window',
	function($scope,$http,Authentication,$sce,AppHtml,$window) {
     $scope.htmlComponentList = [
      {
        "name": "Signing",
        "icon": "ion-edit",
        "htmlContent": '<label class="item item-input"> <span class="input-label">Text</span> <input type="text"> </label>'
      },
      {
        "name": "Camera",
        "icon": "ion-ios-camera",
        "htmlContent": '<label class="item item-input item-select"> <div class="input-label">Select </div> <select> <option>Option 1</option> <option >Option 2</option> <option>Option 3</option> </select> </label>'
      },
      {
        "name": "Tracking",
        "icon": "ion-ios-location",
        "htmlContent": '<li class="item item-toggle">Toggle <label class="toggle toggle-assertive"> <input type="checkbox"> <div class="track"> <div class="handle"></div> </div> </label> </li>'
      }
    ];
     //$scope.init();
    $scope.authentication = Authentication;
    $scope.companyId =  $scope.authentication.user.companyId;
    $scope.frameName = 'foo';
    $scope.frameUrl = 'modules/appsetup/views/frame.html#'+$scope.companyId;
    console.log($scope.frameUrl)
    $http.get('../../../AppFolder/'+$scope.companyId+'/app.html').then(function(response) {
      $scope.htmlcontent = response.data;
      $scope.newHtmlContent = response.data;
    });

    $scope.startCallback = function(event, ui, component) {
      console.log(component);
      $scope.newHtmlContent = $scope.newHtmlContent +component.htmlContent;
       console.log('You started draggin: ' + $scope.newHtmlContent);
      console.log($scope.newHtmlContent)
    };

    $scope.stopCallback = function(event, ui) {
      console.log('Why did you stop draggin me?');
    };

    $scope.dragCallback = function(event, ui) {
      console.log('hey, look I`m flying');
    };

    $scope.dropCallback = function(event, ui) {
      console.log('hey, you dumped me :-(' , $scope.newHtmlContent);
      console.log($scope.newHtmlContent);
      document.getElementById('phone').contentWindow.updatedata($scope.newHtmlContent);

    };

    $scope.overCallback = function(event, ui) {
      console.log('Look, I`m over you');
    };

    $scope.outCallback = function(event, ui) {
      console.log('I`m not, hehe');
    };

    $scope.save = function(event, ui) {
      var str = $scope.newHtmlContent;
      var companyId = $scope.companyId;
      console.log(companyId,str);

      $http({
        url: '/salesmen-appsetup/',
        method: "PUT",
        data: {
          companyId: companyId,
          htmlTemplate: str,
        }
      }).then(function(response) {
            // success
            alert("File Saved");
            console.log(response);
          },
          function(response) { // optional
            // failed
            console.log(response);
          });

    };

    $scope.reset = function(event, ui) {
      alert('I`m not, hehe');
    };

    $scope.loadMobile = function(name) {
      console.log(name)
      //$scope.frameUrl = $sce.trustAsResourceUrl('modules/appsetup/views/frame.html#'+name);
      $scope.frameUrl = $sce.trustAsResourceUrl('modules/appsetup/views/frame.html#'+name);
      //$scope.frameUrl = 'modules/appsetup/views/frame.html#'+name;
    }

	}
]);