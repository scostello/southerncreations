'use strict';

var users = require('../controllers/users.js'),
    utils = require('../../utils/utils.js');

module.exports = function (router) {

    router.route('/users')
        .get(utils.userFromToken, users.all);

    router.route('/users/login')
        .post(users.login);

    router.route('/users/signup')
        .post(users.signup);

    router.route('/users/exists')
        .get(users.exists);

    router.route('/users/:userId')
        .get(users.user, function (req, res) {
            res.status(200).json(req.user);
        });
};