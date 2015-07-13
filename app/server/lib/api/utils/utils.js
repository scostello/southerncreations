'use strict';

var jwt = require('express-jwt');

exports.userFromToken = jwt({
    secret: process.env.JWT_SECRET,
    credentialsRequired: false,
    getToken: function fromHeaderOrQuerystring (req) {
        if (req.cookies && req.cookies.sc_authToken) {
            return req.cookies.sc_authToken;
        }
        return null;
    }
});

exports.isValidEmail = function (email) {
    return /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(email);
};