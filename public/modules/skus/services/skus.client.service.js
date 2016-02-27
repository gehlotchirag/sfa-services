'use strict';

//Skus service used to communicate Skus REST endpoints
angular.module('skus').factory('Skus', ['$resource',
	function($resource) {
		return $resource('skus/:skuId', { skuId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);