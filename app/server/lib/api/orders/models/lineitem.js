'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    validate = require('mongoose-validator'),
    Schema = mongoose.Schema;

/**
 * LineItems Schema
 */
var LineItemSchema = new Schema({
    quantity: {
        type: Number
    },
    variant: {
        type: Schema.ObjectId,
        ref: 'ProductVariant'
    }
});

LineItemSchema.statics.load = function(id, cb) {
    this.findOne({ _id: id })
        .exec(cb);
};

LineItemSchema.statics.loadByNumber = function(number) {
    return this.findOne({ number: number }).exec();
};

module.exports = mongoose.model('LineItem', LineItemSchema);