'use strict';

var mongoose = require('mongoose'),
    products = require('../../fixtures/products'),
    Product = mongoose.model('Product'),
    categories = require('../../fixtures/categories'),
    Category = mongoose.model('Category'),
    users = require('../../fixtures/users'),
    User = mongoose.model('User');

Product.find({}).remove(function () {
    Product.create(products, function (err) {
        console.log('Finished populating products.');
    });
});

Category.find({}).remove(function () {
    Category.create(categories, function () {
        console.log('Finished populating categories.');
    });
});

User.find({}).remove(function () {
    User.create(users, function () {
        console.log('Finished populating users.');
    });
});