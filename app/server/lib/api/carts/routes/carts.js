'use strict';

var carts = require('../controllers/carts.js'),
    utils = require('../../utils/utils.js');

module.exports = function (router) {

    router.route('/carts')
        .get(carts.getCarts)
        .post(utils.userFromToken, carts.addCart)
        .put(utils.userFromToken, carts.updateCart);

    router.route('/carts/:cartId')
        .get(utils.userFromToken, carts.getCart);

    router.route('/carts/:cartId/items')
        .post(utils.userFromToken, carts.addItem);

    router.route('/carts/:cartId/items/:itemId')
        .put(utils.userFromToken, carts.updateItem);
};