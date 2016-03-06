'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var salesmen = require('../../app/controllers/salesmen.server.controller');

	// Salesmen Routes
	app.route('/salesmen')
		.get(salesmen.list)
		.post(users.requiresLogin, salesmen.create);

	app.route('/salesmen/:salesmanId')
		.get(salesmen.read)
		.put(users.requiresLogin, salesmen.hasAuthorization, salesmen.update)
		.delete(users.requiresLogin, salesmen.hasAuthorization, salesmen.delete);

  app.route('/salesmen-login/:mobile/:deviceId')
      .get(salesmen.loginSalesman);

  app.route('/track-salesmen/:taskSalesmanId')
      .put(salesmen.addSalesmanTrack)

  app.route('/page-salesmen')
      .get(salesmen.pagesend)

  app.route('/salesmen-appsetup')
      .put(salesmen.pagesave)


  app.route('/task-salesmen/:taskSalesmanId')
      .get(salesmen.listSalesmanTask)
      .put(users.requiresLogin, salesmen.addSalesmanTask)

  // Finish by binding the Salesman middleware
	app.param('salesmanId', salesmen.salesmanByID);
};
