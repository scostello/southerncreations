'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Category Schema
 */
var Category = new Schema({
    category: {
        type: String,
        required: true,
        trim: true
    }
});

mongoose.model('Category', Category);