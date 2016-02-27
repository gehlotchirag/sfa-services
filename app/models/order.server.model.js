'use strict';

/**
 * Module dependencies.
 */
var QueryPlugin = require('mongoose-query');

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Order Schema
 */
var OrderSchema = new Schema({
  products : [Schema.Types.Mixed],
  created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
}, {strict: false});

OrderSchema.plugin(QueryPlugin);

mongoose.model('Order', OrderSchema);