'use strict';

//Skus service used to communicate Skus REST endpoints
angular.module('appsetup').factory('AppHtml', ['$resource',
	function($resource) {
    var htmlString = '';

    return {
      getHtml: function () {
        return htmlString;
      },
      setHtml: function (storeInfo) {
        htmlString = htmlString + storeInfo;
        console.log("*******");
        console.log(htmlString)
        return htmlString;
      }
    };
	}
]);

