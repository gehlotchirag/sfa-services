'use strict';

//Setting up route
angular.module('salesmen').config(['$stateProvider',
	function($stateProvider) {
		// Salesmen state routing
		$stateProvider.
		state('listSalesmen', {
			url: '/salesmen',
			templateUrl: 'modules/salesmen/views/list-salesmen.client.view.html'
		}).
		state('createSalesman', {
			url: '/salesmen/create',
			templateUrl: 'modules/salesmen/views/create-salesman.client.view.html'
		}).
		state('viewSalesman', {
			url: '/salesmen/:salesmanId',
			templateUrl: 'modules/salesmen/views/view-salesman.client.view.html'
		}).
		state('editSalesman', {
			url: '/salesmen/:salesmanId/edit',
			templateUrl: 'modules/salesmen/views/edit-salesman.client.view.html'
		});
	}
]);