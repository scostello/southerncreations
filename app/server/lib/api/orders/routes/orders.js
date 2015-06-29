'use strict';

var orders = require('../controllers/orders.js'),
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
        .get(orders.show)
        .put(utils.userFromToken, orders.update)
        .delete(utils.userFromToken, orders.destroy);

    router.route('/orders/:orderNumber/lineitems')
        .get(orders.showLineItems)
        .post(orders.addLineItem);

    router.route('/orders/:orderNumber/lineitems/:lineItemId')
        .put(orders.updateLineItem)
        .delete(orders.removeLineItem);


    router.param('orderId', orders.order);
    router.param('orderNumber', orders.orderByNumber);
};