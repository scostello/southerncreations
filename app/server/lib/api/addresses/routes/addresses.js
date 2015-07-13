'use strict';

var zipcodes = require('../controllers/zipcodes.js'),
    utils = require('../../utils/utils.js');

module.exports = function (router) {

    router.route('/zipcodes/search')
        .get(zipcodes.search);
};