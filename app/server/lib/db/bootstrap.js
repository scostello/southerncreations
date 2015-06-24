'use strict';

var Q = require('q'),
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