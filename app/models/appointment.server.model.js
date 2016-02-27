'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Appointment Schema
 */
var AppointmentSchema = new Schema({
  title: {
    type: String,
    default: '',
    required: 'Please fill Appointment name',
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  className: {
    type: String,
    default: 'bg-primary'
  },
  from: {
    type: Schema.ObjectId,
    ref: 'Doctor'
  },
  start: {
    type: Date,
    default: Date.now
  },
  end: {
    type: Date,
    default: Date.now
  },
  created: {
    type: Date,
    default: Date.now
  },
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Appointment', AppointmentSchema);
