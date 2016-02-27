'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Sku = mongoose.model('Sku'),
	_ = require('lodash');

/**
 * Create a Sku
 */
exports.create = function(req, res) {
	var sku = new Sku(req.body);
	sku.user = req.user;

	sku.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(sku);
		}
	});
};

/**
 * Show the current Sku
 */
exports.read = function(req, res) {
	res.jsonp(req.sku);
};

/**
 * Update a Sku
 */
exports.update = function(req, res) {
	var sku = req.sku ;

	sku = _.extend(sku , req.body);

	sku.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(sku);
		}
	});
};

/**
 * Delete an Sku
 */
exports.delete = function(req, res) {
	var sku = req.sku ;

	sku.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(sku);
		}
	});
};

/**
 * List of Skus
 */
exports.list = function(req, res) { 
	Sku.find().sort('-created').populate('user', 'displayName').exec(function(err, skus) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(skus);
		}
	});
};

/**
 * Sku middleware
 */
exports.skuByID = function(req, res, next, id) { 
	Sku.findById(id).populate('user', 'displayName').exec(function(err, sku) {
		if (err) return next(err);
		if (! sku) return next(new Error('Failed to load Sku ' + id));
		req.sku = sku ;
		next();
	});
};

/**
 * Sku authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.sku.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
