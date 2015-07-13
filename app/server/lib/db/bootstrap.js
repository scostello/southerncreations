'use strict';

var Q = require('q'),
    _ = require('lodash'),
    products = require('./fixtures/products'),
    ProductVariant = require('../api/products/models/productvariant.js'),
    Product = require('../api/products/models/product.js'),
    Order = require('../api/orders/models/order.js'),
    LineItem = require('../api/orders/models/lineitem.js');

ProductVariant.find({}).remove().exec()
    .then(function () {
        return Product.find({}).remove().exec();
    })
    .then(function () {
        _.each(products, function (product) {

            (function (prd, variants) {
                ProductVariant.collection.insert(variants, function (err, vs) {
                    var product = new Product(prd);
                    product.variants = _(vs.ops).pluck('_id').valueOf();
                    product.save();
                });
            } (product.product, product.variants));

        });
    });
