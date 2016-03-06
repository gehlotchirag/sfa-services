'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Salesman = mongoose.model('Salesman'),
	_ = require('lodash');
var fs = require('fs');

/**
 * Create a Salesman
 */
exports.create = function(req, res) {

	var salesman = new Salesman(req.body);
console.log(req.body)
console.log("***")
console.log(req.user)
	salesman.user = req.user;
  salesman.companyId = req.user.companyId;

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
  var companyId = req.user.companyId;
	Salesman.find({companyId:companyId}).sort('-created').populate('user', 'displayName').exec(function(err, salesmen) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
      console.log(salesmen);
			res.jsonp(salesmen);
		}
	});
};

//exports.listById = function(req, res) {
//	Salesman.find({companyID:req.param('companyID')}).sort('-created').populate('user', 'displayName').exec(function(err, salesmen) {
//		if (err) {
//			return res.status(400).send({
//				message: errorHandler.getErrorMessage(err)
//			});
//		} else {
//			res.jsonp(salesmen);
//		}
//	});
//};

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

exports.pagesave = function(req, res) {
  var htmlTemplate = req.body.htmlTemplate;
  var companyId = req.body.companyId;

  var dirname = "public/AppFolder/"+companyId+"/";
  console.log(dirname);
  fs.existsSync(dirname) || fs.mkdirSync(dirname);
  fs.writeFile(dirname+'/app.html', htmlTemplate, function (err,data) {
    if (err) {
      return console.log(err);
    }
    console.log(data);
    res.json({'fileupated' :companyId });
  });
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
