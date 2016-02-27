'use strict';

//Salesmen service used to communicate Salesmen REST endpoints
angular.module('salesmen').factory('Salesmen', ['$resource',
	function($resource) {
		return $resource('salesmen/:salesmanId', { salesmanId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);