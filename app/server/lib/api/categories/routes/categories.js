'use strict';

var categories = require('../controllers/categories.js');

module.exports = function (router) {

    router.route('/categories')
        .get(categories.all);
};