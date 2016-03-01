'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Task Schema
 */
var TaskSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Task name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	salesman: {
		type: Schema.ObjectId,
		ref: 'Salesman'
  },
	assigned_by: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Task', TaskSchema);