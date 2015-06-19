'use strict';

/**
 * Module dependencies.
 */
var User = require('../models/user'),
    jwt = require('jsonwebtoken'),
    jwtSecret = process.env.JWT_SECRET,
    _ = require('lodash');

/**
 * Find user by id
 */
exports.user = function (req, res, next) {
    var _id = req.params.userId;

    User.load(_id, function(err, user) {
        if (err) {
            return next(err);
        }

        if (!user) {
            return next(new Error('Failed to load user ' + _id));
        }

        req.user = user;
        next();
    });
};

exports.update = function (req, res) {
    User.load(req.params.userId, function (err, user) {

    });
};

exports.updateShoppingCart = function (req, res) {
    User.findOneAndUpdate({_id: req.user._id}, {shoppingCart: req.body.shoppingCart}, {upsert: true}, function (err, user) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot update the user'
            });
        }
        res.status(200).json(user);
    });
};

exports.add = function (req, res, next) {

};

exports.login = function (req, res, next) {
    var body = req.body,
        allDataSent = function (data) {
            return !_.isUndefined(data) && !_.isNull(data);
        };

    if (!_.every([body.username,  body.password], allDataSent)) {
        return res
            .status(400)
            .json({
                error: true,
                message: 'You must send the username and the password'
            });
    }

    User.byUsername(body.username, function (err, user) {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res
                .status(400)
                .json({
                    error: true,
                    message: 'A user was not found with the provided username or password'
                });
        }

        if (!user.isValidPassword(body.password)) {
            return res
                .status(401)
                .json({
                    error: true,
                    message: 'Invalid credentials'
                });
        }

        user = user.toObject();
        user = _.omit(user, 'password');
        user.token = jwt.sign(user, jwtSecret, {expiresInMinutes: 60 * 5});

        return res
            .status(200)
            .json(user);
    });
};

exports.signup = function (req, res, next) {
    var body = req.body,
        allDataSent = function (data) {
            return !_.isUndefined(data) && !_.isNull(data);
        };

    if (!_.every([body.username, body.email, body.password, body.confirmpassword], allDataSent)) {
        return res
            .status(400)
            .json({
                error: true,
                message: 'You must send the username and the password'
            });
    }

    User.byUsername(body.username, function (err, user) {
        var newUser;

        if (err) {
            return next(err);
        }

        if (user) {
            return res
                .status(400)
                .json({
                    error: true,
                    message: 'A user with that username already exists'
                });
        }

        newUser = new User({
            username: body.username,
            email: body.email,
            password: body.password
        });

        newUser.saveAsync()
            .spread(function (user) {
                return res
                    .status(201)
                    .json({
                        user: user
                    });
            })
            .catch(function (err) {
                return res
                    .status(400)
                    .send({
                        error: true,
                        message: 'Something went wrong!'
                    });
            });
    });
};

exports.all = function (req, res) {
    User.find({})
        .exec(function(err, users) {
            if (err) {
                return res.status(500).json({
                    error: 'Cannot list the users'
                });
            }
            res.status(200).json(users);
        })
};