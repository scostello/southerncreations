'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt-nodejs'),
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
    email: {
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

// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);