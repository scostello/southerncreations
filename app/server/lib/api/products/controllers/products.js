'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Product = mongoose.model('Product'),
    _ = require('lodash');

/**
 * Find product by id
 */
exports.product = function(req, res, next, id) {
    Product.load(id, function(err, product) {
        if (err) {
            return next(err);
        }

        if (!product) {
            return next(new Error('Failed to load product ' + id));
        }

        req.product = product;
        next();
    });
};

/**
 * Create an product
 */
exports.create = function(req, res) {
    var product = new Product(req.body);
    product.user = req.user;

    product.save(function(err) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot save the product'
            });
        }
        res.json(product);

    });
};

/**
 * Update an product
 */
exports.update = function(req, res) {
    var product = req.product;

    product = _.extend(product, req.body);

    product.save(function(err) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot update the product'
            });
        }
        res.json(product);

    });
};

/**
 * Delete an product
 */
exports.destroy = function(req, res) {
    var product = req.product;

    product.remove(function(err) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot delete the product'
            });
        }
        res.json(product);

    });
};

/**
 * Show a product
 */
exports.show = function(req, res) {
    res.json(req.product);
};

/**
 * List of Products
 */
exports.all = function(req, res) {
    Product.find({})
        .sort('-created')
        .populate('category')
        .exec(function(err, products) {
            if (err) {
                return res.status(500).json({
                    error: 'Cannot list the products'
                });
            }
            res.json(products);
        });
};