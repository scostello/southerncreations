'use strict';

/**
 * Module dependencies.
 */
var Cart = require('../models/cart'),
    _ = require('lodash');

exports.getCart = function (req, res) {
    Cart.load(req.user._id, function (err, cart) {
        if (err) {
            console.log('my error', err);
        }

        if (_.isNull(cart)) {
            var newCart = new Cart({_id: req.user._id, status: 'active'});

            console.log(newCart);
            newCart.save(function (err, newCart) {
                if (err) {
                    return console.error(err);
                }
                res.status(201).json(newCart);
            });
        } else {
            res.status(200).json(cart);
        }
    });
};

exports.getCarts = function (req, res) {

};

exports.addCart = function (req, res) {
    res.status(200).json({});
};

exports.updateCart = function (req, res) {

};

exports.addItem = function (req, res) {
    var user = req.user,
        cartItem = req.body.body;

    Cart.findOneAndUpdate({_id: user._id, status: 'active'}, {$set: {modified_on: new Date()}, $push: {items: cartItem}}, function (err, cart) {
        if (err) {
            return res.status(500).json({
                status: 'error',
                message: 'Cannot add item to save cart.'
            });
        }

        res.status(201).json(cart);
    });
};

exports.updateItem = function (req, res) {

};

exports.all = function (req, res) {
    Cart.find({})
        .exec(function(err, carts) {
            if (err) {
                return res
                    .status(500)
                    .json({
                        error: 'Cannot list the carts'
                    });
            }

            res.status(200)
                .json(carts);
        });
};