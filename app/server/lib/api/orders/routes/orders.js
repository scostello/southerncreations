'use strict';

var orders = require('../controllers/orders.js'),
    checkout = require('../controllers/checkout.js'),
    utils = require('../../utils/utils.js');

module.exports = function (router) {
    var requiresAdmin = function (req, res, next) {
            if (!req.user.isAdmin) {
                return res.status(401).json({error: true, message: 'Unauthorized action on orders.'});
            }

            next();
        };

    router.route('/orders')
        .get(orders.all)
        .post(utils.userFromToken, orders.create);

    router.route('/orders/:orderNumber')
        .get(orders.orderIsValid, orders.show)
        .put(utils.userFromToken, orders.orderIsValid, orders.update)
        .delete(utils.userFromToken, orders.orderIsValid, orders.destroy);

    router.route('/orders/:orderNumber/lineitems')
        .post(orders.orderIsValid, orders.addLineItem);

    router.route('/orders/:orderNumber/lineitems/:lineItemId')
        .put(utils.userFromToken, orders.orderIsValid, orders.updateLineItem)
        .delete(orders.orderIsValid, orders.removeLineItem);

    router.route('/orders/:orderNumber/paymenttoken')
        .get(orders.orderIsValid, checkout.generateToken);

    router.route('/checkouts/:orderNumber')
        .put(orders.orderIsValid, checkout.nextState, orders.show);

    router.param('orderNumber', orders.orderByNumber);
};