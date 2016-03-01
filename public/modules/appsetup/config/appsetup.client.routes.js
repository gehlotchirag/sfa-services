'use strict';

//Setting up route
angular.module('appsetup').config(['$stateProvider',
	function($stateProvider) {
		// Appsetup state routing
		$stateProvider.
		state('appsetup', {
			url: '/appsetup',
			templateUrl: 'modules/appsetup/views/appsetup.client.view.html'
		});
	}
]);