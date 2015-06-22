'use strict';

var _ = require('lodash'),
    Q = require('q'),
    mongoose = require('mongoose'),
    products = require('./fixtures/products'),
    Product = require('../api/products/models/product.js');

Product.find({}).remove().exec()
    .then(function () {
        var dfds = [];
        products.forEach(function (product) {
            dfds.push(Product.create(product));
        });

        Q.all(dfds)
            .done(function () {
                console.log('Finished populating products.');
            });
    });