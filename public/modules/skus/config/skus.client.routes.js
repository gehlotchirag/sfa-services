'use strict';

//Setting up route
angular.module('skus').config(['$stateProvider',
	function($stateProvider) {
		// Skus state routing
		$stateProvider.
		state('listSkus', {
			url: '/skus',
			templateUrl: 'modules/skus/views/list-skus.client.view.html'
		}).
		state('createSku', {
			url: '/skus/create',
			templateUrl: 'modules/skus/views/create-sku.client.view.html'
		}).
		state('viewSku', {
			url: '/skus/:skuId',
			templateUrl: 'modules/skus/views/view-sku.client.view.html'
		}).
		state('editSku', {
			url: '/skus/:skuId/edit',
			templateUrl: 'modules/skus/views/edit-sku.client.view.html'
		});
	}
]);