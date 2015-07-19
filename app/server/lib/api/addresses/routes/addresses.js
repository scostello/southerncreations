'use strict';

var addresses = require('../controllers/addresses.js'),
    zipcodes = require('../controllers/zipcodes.js'),
    utils = require('../../utils/utils.js');

module.exports = function (router) {

    router.route('/zipcodes/search')
        .get(zipcodes.search);

    router.route('/addresses/states')
        .get(addresses.getStates);
};