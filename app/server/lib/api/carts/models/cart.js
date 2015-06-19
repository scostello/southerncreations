'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Cart Schema
 */
var CartSchema = new Schema({
    status: {
        type: String,
        required: true,
        trim: true
    },
    modified_on: {
        type: Date,
        default: Date.now
    },
    shipping: {
        type: Number,
        default: 0
    },
    taxRate: {
        type: Number,
        default: 0
    },
    tax: {
        type: Number,
        default: 0
    },
    itemsCount: {
        type: Number,
        default: 0
    },
    items: {
        type: Array,
        default: []
    }
});

CartSchema.statics.load = function(id, cb) {
    this.findOne({ _id: id })
        .exec(cb);
};

module.exports = mongoose.model('Cart', CartSchema);