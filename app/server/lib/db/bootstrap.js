'use strict';

var _ = require('lodash'),
    Q = require('q'),
    mongoose = require('mongoose'),
    products = require('./fixtures/products'),
    Product = mongoose.model('Product'),
    categories = require('./fixtures/categories'),
    Category = mongoose.model('Category'),
    users = require('./fixtures/users'),
    User = mongoose.model('User');

/**
 * Populating categories and products
 */
Category.find({}).remove().exec()
    .then(function () {
        console.log('Removed all categories.');

        return Category.create(categories);
    })
    .then(function () {
        console.log('Re-populated categories.');

        return Product.find({}).remove().exec()
            .then(function () {
                return Category.find({}).exec();
            });
    })
    .then(function (categories) {
        console.log('Removed all products.');

        var dfds = [];
        products.forEach(function (product) {
            product.category = _.find(categories, function (category) { return product.category === category.name; });

            dfds.push(Product.create(product));
        });

        Q.all(dfds)
            .done(function () {
                console.log('Finished populating products.');
            });
    });


/**
 * Populating users
 */
User.find({}).remove().exec()
    .then(function () {
        User.create(users, function () {
            console.log('Finished populating users.');
        });
    });
