'use strict';

//Setting up route
angular.module('managers').config(['$stateProvider',
	function($stateProvider) {
		// Managers state routing
		$stateProvider.
		state('managers', {
			url: '/managers',
			templateUrl: 'modules/managers/views/managers.client.view.html'
		});
	}
]);