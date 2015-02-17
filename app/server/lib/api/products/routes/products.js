'use strict';

var products = require('../controllers/products.js');

exports.addRoutes = function (router) {
    router.route('/products')
        .get(products.all);

    // TODO: Need authentication middleware
    router.route('/products/:productId')
        .get(products.show)
        .put(products.update)
        .delete(products.destroy);

    // Finish with setting up the productId param
    router.param('productId', products.product);
};