'use strict';

/**
 * Module dependencies.
 */
var Product = require('../models/product'),
    hypermedia = require('../../utils/hypermedia.js'),
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
 * Create a product
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
    res.status(200).json(req.product);
};

exports.variantByIdentifier = function () {

};

/**
 * List of Products
 */
exports.all = function(req, res) {
    var fields = {
        'name': 1,
        'slug': 1,
        'pricing.price': 1,
        'variants.name': 1,
        'variants.slug': 1,
        'variants.sku': 1,
        'variants.pricing.price': 1
    };

    Product.find({}, fields)
        .sort('name')
        .exec(function(err, products) {
            var hmList = _.map(products, function (product) {
                return hypermedia.productHypermedia(product);
            });
            if (err) {
                return res.status(500).json({
                    error: 'Cannot list the products'
                });
            }
            res.status(200).json(hmList);
        });
};