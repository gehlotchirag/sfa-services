'use strict';

//Setting up route
angular.module('tackings').config(['$stateProvider',
	function($stateProvider) {
		// Tackings state routing
		$stateProvider.
		state('trackings', {
			url: '/trackings',
			templateUrl: 'modules/tackings/views/trackings.client.view.html'
		});
	}
]);