'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Salesman = mongoose.model('Salesman'),
	_ = require('lodash');

/**
 * Create a Salesman
 */
exports.create = function(req, res) {
  console.log(req.body)
	var salesman = new Salesman(req.body);
	salesman.user = req.user;
  console.log(salesman)

	salesman.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(salesman);
		}
	});
};

/**
 * Show the current Salesman
 */
exports.read = function(req, res) {
  console.log("here");
	res.jsonp(req.salesman);
};

/**
 * Update a Salesman
 */
exports.update = function(req, res) {
	var salesman = req.salesman ;

	salesman = _.extend(salesman , req.body);

	salesman.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(salesman);
		}
	});
};

/**
 * Delete an Salesman
 */
exports.delete = function(req, res) {
	var salesman = req.salesman ;

	salesman.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(salesman);
		}
	});
};

/**
 * List of Salesmen
 */
exports.list = function(req, res) {
	Salesman.find().sort('-created').populate('user', 'displayName').exec(function(err, salesmen) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(salesmen);
		}
	});
};

/**
 * Add Task of Salesmen
 */
exports.listSalesmanTask = function(req, res) {
  console.log("???" + req.param('taskSalesmanId'));
  Salesman.findOne({_id:req.param('taskSalesmanId')}).sort('-created').populate('user', 'displayName').exec(function(err, salesmen) {
		if (err) {
      console.log(err)
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(salesmen);
		}
	});
};

exports.loginSalesman = function(req, res) {
  console.log("***" + req.param('mobile'));
  Salesman.findOneAndUpdate({ mobile: req.param('mobile') },{deviceId: req.param('deviceId')}).exec(function(err, salesmen) {
    if (err) {
      console.log(err)
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      console.log(salesmen)
      res.jsonp(salesmen);
    }
  })
};
/**
 * Add Task For Salesmen
 */
exports.addSalesmanTask = function(req, res) {
  console.log("*** -------*****");
  var task = req.body.task;
  task.assigned_by = req.user;
  console.log(task);

  Salesman.findByIdAndUpdate(
      req.param('taskSalesmanId'),
      {$push: {"tasks": task}}
//      {safe: true, upsert: true, new : true},
  ).sort('-created').exec(function(err, salesman) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(salesman.tasks);
    }
  });
};

exports.pagesend = function(req, res) {
  //res.sendfile('.../../views/test.html', {root: __dirname })
  res.sendfile('views/templates/apptemplate.html', {root: __dirname+ '../../' })
}
exports.addSalesmanTrack = function(req, res) {
  console.log("&&&& ----- &&&&&");
  var track = req.body;
  console.log(track);

  Salesman.findByIdAndUpdate(
      req.param('taskSalesmanId'),
      {$push: {"tracks": track}}
//      {safe: true, upsert: true, new : true},
  ).sort('-created').exec(function(err, salesman) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(salesman.tracks);
    }
  });
};



/**
 * Salesman middleware
 */
exports.salesmanByID = function(req, res, next, id) {
  console.log("main");
  Salesman.findById(id).populate('user', 'displayName').exec(function(err, salesman) {
		if (err) return next(err);
		if (! salesman) return next(new Error('Failed to load Salesman ' + id));
		req.salesman = salesman ;
		next();
	});
};

/**
 * Salesman authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
  console.log(req)
	if (req.salesman.user.id !== req.user.id  ||  req.salesman.user.id !== req.manager.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};