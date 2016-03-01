'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Task = mongoose.model('Task'),
	_ = require('lodash');

/**
 * Create a Task
 */
exports.create = function(req, res) {
	var task = new Task(req.body);
	task.assigned_by = req.user;

	task.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(task);
		}
	});


};

/**
 * Show the current Task
 */
exports.read = function(req, res) {
	res.jsonp(req.task);
};

/**
 * Update a Task
 */
exports.update = function(req, res) {
	var task = req.task ;

	task = _.extend(task , req.body);

	task.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(task);
		}
	});
};

/**
 * Delete an Task
 */
exports.delete = function(req, res) {
	var task = req.task ;

	task.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(task);
		}
	});
};

/**
 * List of Tasks for Salesman
 */
exports.listBySalesman = function(req, res) {
	Task.find({'salesmen._id':req.param('salesmanId')}).sort('-created').populate('salesman').exec(function(err, tasks) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(tasks);
		}
	});
};

/**
 * List of Tasks
 */
exports.list = function(req, res) {
	Task.find().sort('-created').populate('assigned_by', 'displayName').exec(function(err, tasks) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(tasks);
		}
	});
};

/**
 * Task middleware
 */
exports.taskByID = function(req, res, next, id) {
  console.log("hmmmm")
	Task.findById(id).populate('assigned_by', 'displayName').exec(function(err, task) {
		if (err) return next(err);
		if (! task) return next(new Error('Failed to load Task ' + id));
		req.task = task ;
		next();
	});
};

/**
 * Task authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.task.assigned_by.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
