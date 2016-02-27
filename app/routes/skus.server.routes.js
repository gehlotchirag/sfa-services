'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var skus = require('../../app/controllers/skus.server.controller');

	// Skus Routes
	app.route('/skus')
		.get(skus.list)
		.post(users.requiresLogin, skus.create);

	app.route('/skus/:skuId')
		.get(skus.read)
		.put(users.requiresLogin, skus.hasAuthorization, skus.update)
		.delete(users.requiresLogin, skus.hasAuthorization, skus.delete);

	// Finish by binding the Sku middleware
	app.param('skuId', skus.skuByID);
};
