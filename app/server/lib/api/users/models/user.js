'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt'),
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
    password: {
        type: String,
        required: true
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
    }
});

// checking if password is valid
UserSchema.methods.isValidPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.statics.byEmail = function(email, cb) {
    this.findOne({email: email})
        .exec(cb);
};

UserSchema.statics.byUsername = function(username, cb) {
    this.findOne({username: username})
        .exec(cb);
};

UserSchema.statics.byId = function(id, cb) {
    this.findOne({_id: id})
        .exec(cb);
};

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('User', UserSchema);