'use strict';

module.exports = function (app, router) {

    var _ = require('lodash'),
        mongoose = require('mongoose'),
        UserModel = mongoose.model('User'),
        jwt = require('jsonwebtoken'),
        viewConfig = app.get('config').getViewConfig('login');

    router.route('/login')
        .post(function (req, res, next) {
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

            UserModel.byUsername(body.username, function (err, user) {
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

                return res
                    .status(200)
                    .json({
                        token: jwt.sign(_.omit(user.toObject(), 'password'), 'some new secret shit', {expiresInMinutes: 60 * 5 })
                    });
            });
        });

    router.route('/signup')
        .post(function (req, res, next) {
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

            UserModel.byUsername(body.username, function (err, user) {
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

                newUser = new UserModel({
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
        });

    app.get('/logout', function (req, res) {
        res.logout();
        res.redirect('/');
    });

    app.get('/^(login|signup)$', function (req, res) {
        res.render('auth', viewConfig);
    });


};
