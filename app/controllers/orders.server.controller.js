'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Order = mongoose.model('Order'),
	_ = require('lodash');

/**
 * Create a Order
 */
exports.create = function(req, res) {
	var order = new Order(req.body);
	order.user = req.user;

	order.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(order);
		}
	});
};

/**
 * Show the current Order
 */
exports.read = function(req, res) {
	res.jsonp(req.order);
};

/**
 * Update a Order
 */
exports.update = function(req, res) {
	var order = req.order ;

	order = _.extend(order , req.body);

	order.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(order);
		}
	});
};

/**
 * Delete an Order
 */
exports.delete = function(req, res) {
	var order = req.order ;

	order.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(order);
		}
	});
};

/**
 * List of Orders
 */
exports.list = function(req, res) { 
	Order.find().sort('-created').populate('user', 'displayName').exec(function(err, orders) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(orders);
		}
	});
};

/**
 * Find of Orders
 */
exports.analytics = function(req, res) {
  //var query = [];
  //
  //query.push({
  //  $project: {
  //    created_at: '$created_at',
  //    month: {
  //      $month: currentMonth
  //    }
  //  }
  //});
  //
  //query.push({
  //  $match: {
  //    month: currentMonth.getMonth() + 1
  //  }
  //});
  //
  //query.push({
  //  $limit: 5
  //});
  //
  //query.push({
  //  $sort: {
  //    created_at: -1
  //  }
  //});
  //Order.query(req.query, function(error, data){
  //  res.json(error?{error: error}:data);
  //});
console.log("********* --------- ***********");
console.log(req.query);
var query = (JSON.parse(req.query.q));
  console.log(query);
  console.log("********* --------- ***********");

  Order.query(req.query, function(err, orders){
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(orders);
		}
	});
  /*
   Order.aggregate([{"$group":{"_id":"$orderTotal","count":{"$sum":1}}}]).exec(function(err, orders) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(orders);
    }
  });
 */

  //testmodel.query(req.query, function(error, data){
   // res.json(error?{error: error}:data);
  //});

};

/**
 * Order middleware
 */
exports.orderByID = function(req, res, next, id) { 
	Order.findById(id).populate('user', 'displayName').exec(function(err, order) {
		if (err) return next(err);
		if (! order) return next(new Error('Failed to load Order ' + id));
		req.order = order ;
		next();
	});
};

/**
 * Order authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.order.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
