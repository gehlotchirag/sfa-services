'use strict';

//Setting up route
angular.module('tasks').config(['$stateProvider',
	function($stateProvider) {
		// Tasks state routing
		$stateProvider.
		state('tasks', {
			url: '/tasks',
			templateUrl: 'modules/tasks/views/tasks.client.view.html'
		}).
    state('listTasksSalesmen', {
      url: '/task-list-salesmen/:salesmanId',
      templateUrl: 'modules/tasks/views/list-task-salesmen.client.view.html'
    }).
    state('createTasksSalesmen', {
      url: '/tasks-create-salesmen/:salesmanId',
      templateUrl: 'modules/tasks/views/create-task.client.view.html'
    });

  }
]);