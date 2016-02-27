'use strict';

//Setting up route
angular.module('skusx').config(['$stateProvider',
	function($stateProvider) {
		// Skus state routing
		$stateProvider.
		state('skusx', {
			url: '/skusx',
			templateUrl: 'modules/skus/views/skus.client.view.html'
		});
	}
]);