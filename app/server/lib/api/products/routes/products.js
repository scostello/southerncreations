'use strict';

var products = require('../controllers/products.js'),
    jwt = require('express-jwt');

module.exports = function (router) {
    var jwtCheck = jwt({
            secret: 'some new secret shit'
        }),
        requiresAdmin = function (req, res, next) {
            if (!req.user.isAdmin) {
                return res.status(401).json({error: true, message: 'Unauthorized action on products.'});
            }

            next();
        };

    router.route('/products')
        .get(products.all)
        .post(jwtCheck, requiresAdmin, function (req, res) {
            return res.status(201).json({message: 'Success bitch'});
        });

    // TODO: Need authentication middleware
    router.route('/products/:productId')
        .get(products.show)
        .put(jwtCheck, requiresAdmin, products.update)
        .delete(jwtCheck, requiresAdmin, products.destroy);

    // Finish with setting up the productId param
    router.param('productId', products.product);
};