'use strict';

/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Salesman Schema
 */

var tasksSchema = new Schema({
  status: {
    type: Boolean,
    default: false
  },
  destination:{
    name: {
    type: String,
    default: '',
    trim: true
  },
    phone: {
      type: String,
      default: '',
      trim: true
    },
    addLine1: {
      type: String,
      default: '',
      trim: true
    },
    addLine2: {
      type: String,
      default: '',
      trim: true
    },
    loc: {
      'type': {
      type: String,
      enum: "Point",
      default: "Point"
    },
      coordinates: {
        type: [Number]
      }
    }
  },
  completed_on: {
    type: Date
  },
  assigned_by: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

tasksSchema.index({destination:{loc: '2dsphere'}});

var SalesmanSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Salesman name',
    trim: true
  },
  deviceId:{
    type: String,
    trim: true
  },
  mobile: {
    type: String,
    default: '',
    required: 'Please fill Salesman Mobile',
    trim: true
  },
  tasks : [tasksSchema],
  tracks : [Schema.Types.Mixed],
  created: {
    type: Date,
    default: Date.now
  },
  manager: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Salesman', SalesmanSchema);