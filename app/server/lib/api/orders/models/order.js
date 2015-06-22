'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    validate = require('mongoose-validator'),
    Schema = mongoose.Schema;

var validateEmail = [
    validate({
        validator: 'isEmail',
        message: 'Invalid email address format'
    })
];

/**
 * Orders Schema
 */
var OrderSchema = new Schema({
    number: {
        type: String
    },
    itemTotal: {
        type: Number,
        default: 0.0
    },
    displayItemTotal: {
        type: String,
        default: '0.0'
    },
    state: {
        type: String,
        default: 'cart'
    },
    userId: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    email: {
        type: String,
        trim: true,
        validate: validateEmail,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    modifiedAt: {
        type: Date,
        default: Date.now()
    },
    completedAt: {
        type: Date,
        default: null
    },
    paymentTotal: {
        type: Number,
        default: 0.0
    },
    shipmentState: {
        type: String,
        default: null
    },
    paymentState: {
        type: String,
        default: null
    },
    specialInstructions: {
        type: String,
        default: ''
    },
    totalQuantity: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    },
    lineItems: {
        type: [{ type: Schema.ObjectId, ref: 'Product' }]
    }
});

OrderSchema.statics.load = function(id, cb) {
    this.findOne({ _id: id })
        .exec(cb);
};

OrderSchema.statics.loadByNumber = function(number, cb) {
    this.findOne({ number: number })
        .exec(cb);
};

module.exports = mongoose.model('Order', OrderSchema);