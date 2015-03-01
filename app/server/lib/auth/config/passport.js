'use strict';

var LocalStrategy = require('passport-local').Strategy,
    User = require('../../api/users/models/user');

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, done) {
        email = email.toLowerCase();

        process.nextTick(function () {
            User.findOne({'email': email}, function (err, user) {
                // if there are any errors, return the error
                if (err) {
                    return done(err);
                }

                // if no user is found, return the message
                if (!user) {
                    return done(null, false, req.flash('loginMessage', 'No user found.'));
                }

                if (!user.validPassword(password)) {
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                } else {
                    return done(null, user);
                }
            });
        });
    }));
};