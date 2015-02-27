'use strict';

module.exports = function (app, passport) {

    // route middleware to ensure user is logged in
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();

        res.redirect('/');
    }

    app.get('/profile', isLoggedIn, function (res, user) {
        res.render('profile', {user: user});
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/logout', function (res) {
        res.logout();
        res.redirect('/');
    });
};
