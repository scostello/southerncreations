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
 * Products Schema
 */
var UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    emailaddress: {
        type: String,
        required: true,
        trim: true,
        validate: validateEmail
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    },
    orders: {
        type: Array
    },
    paymentMethods: {
        type: Array
    },
    password: String,
    salt: String
});

mongoose.model('User', UserSchema);