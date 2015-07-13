'use strict';

/**
 * Module dependencies.
 */
var User = require('../models/user'),
    Order = require('../../orders/models/order'),
    Q = require('q'),
    jwt = require('jsonwebtoken'),
    jwtSecret = process.env.JWT_SECRET,
    hypermedia = require('../../utils/hypermedia.js'),
    utils = require('../../utils/utils.js'),
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

exports.exists = function (req, res) {
    var email = req.query && req.query.email;

    if (!email) {
        res.status(500).json({error: 'Email parameter required'});
    }

    User.findOne({email: email}).exec()
        .then(function (user) {
            res.status(200).json({userExists: !!(user)});
        });
};

exports.add = function (req, res, next) {

};

exports.login = function (req, res) {
    var body = req.body,
        username = req.body && req.body.username,
        password = req.body && req.body.password,
        orderNumber = req.body && req.body.orderNumber,
        orderToken = req.body && req.body.orderToken,
        promise;

    if (!username || !password) {
        return res.status(400).json({error: 'You must send the username and the password'});
    }

    promise = utils.isValidEmail(username) ? User.byEmail(username) : User.byUsername(username);

    promise
        .then(function (user) {
            var orderPromise;

            if (!user) {
                return res.status(400).json({error: 'A user was not found with the provided username/email or password'});
            }

            if (!user.isValidPassword(password)) {
                return res.status(401).json({error: 'Invalid credentials'});
            }

            if (orderNumber && orderToken) {
                orderPromise = Order.findOne({number: orderNumber, token: orderToken}).exec()
                    .then(function (order) {
                        if (order) {
                            order.userId = user._id;
                            return order.save();
                        } else {
                            return Q.when();
                        }
                    });
            } else {
                orderPromise = Q.when();
            }

            return Q.all([Q.when(user), orderPromise]);
        })
        .then(function (results) {
            var user = results[0];

            user = user.toObject();
            user = _.omit(user, 'password');
            user = hypermedia.userHypermedis(user);
            res.cookie('sc_authToken', jwt.sign(user, jwtSecret, {expiresInMinutes: 60 * 5}), {httpOnly: true});

            return res.status(200).json(user);
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
            return res.status(400).json({error: 'A user with that username already exists'});
        }

        newUser = new User({
            username: body.username,
            email: body.email,
            password: body.password
        });

        newUser.saveAsync()
            .spread(function (user) {
                return res.status(201).json({user: user});
            })
            .catch(function (err) {
                return res.status(400).send({error: 'Something went wrong!'});
            });
    });
};

exports.all = function (req, res) {
    User.find({})
        .exec(function(err, users) {
            if (err) {
                return res.status(500).json({error: 'Cannot list the users'});
            }
            res.status(200).json(users);
        })
};