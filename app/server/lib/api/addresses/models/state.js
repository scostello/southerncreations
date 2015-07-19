'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    validate = require('mongoose-validator'),
    Schema = mongoose.Schema;

var StateSchema = new Schema({
    name: String,
    abbreviation: String
});

module.exports = mongoose.model('State', StateSchema);