'use strict';

var products = require('../controllers/products.js'),
    utils = require('../../utils/utils.js');

module.exports = function (router) {
    var requiresAdmin = function (req, res, next) {
            if (!req.user.isAdmin) {
                return res.status(401).json({error: true, message: 'Unauthorized action on products.'});
            }

            next();
        };

    router.route('/products')
        .get(products.all)
        .post(utils.userFromToken, requiresAdmin, function (req, res) {
            return res.status(201).json({message: 'Success bitch'});
        });

    // TODO: Need authentication middleware
    router.route('/products/:productId')
        .get(products.show)
        .put(utils.userFromToken, requiresAdmin, products.update)
        .delete(utils.userFromToken, requiresAdmin, products.destroy);

    router.route('/products/:productId/variants')
        .get(products.variants);

    // Finish with setting up the productId param
    router.param('productId', products.product);
};