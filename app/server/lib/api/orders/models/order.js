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
        passIfEmpty: true,
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
    checkoutSteps: {
        type: Array,
        default: ['cart', 'address', 'delivery', 'payment', 'confirm', 'complete']
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
    deletedOn: {
        type: Date,
        default: null
    },
    paymentTotal: {
        type: Number,
        default: 0.0
    },
    shipmentAddress: {
        fullName: String,
        address1: String,
        address2: String,
        city: String,
        phone: Number,
        zipcode: Number,
        state: {
            abbreviation: String,
            name: String
        }
    },
    billingAddress: {
        fullName: String,
        address1: String,
        address2: String,
        city: String,
        phone: Number,
        zipcode: Number,
        state: {
            abbreviation: String,
            name: String
        }
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
    lineItems: [{type: Schema.ObjectId, ref: 'LineItem'}]
});

OrderSchema.statics.load = function(id, cb) {
    this.findOne({ _id: id })
        .exec(cb);
};

OrderSchema.statics.loadByNumber = function(number) {
    return this.findOne({number: number})
        .populate('lineItems')
        .exec()
        .then(function (order) {
            return order.populate({path: 'lineItems.variant', model: 'ProductVariant'}).execPopulate();
        });
};

module.exports = mongoose.model('Order', OrderSchema);