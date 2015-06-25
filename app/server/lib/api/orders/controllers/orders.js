'use strict';

/**
 * Module dependencies.
 */
var Order = require('../models/order'),
    hypermedia = require('../../utils/hypermedia.js'),
    hat = require('hat'),
    _ = require('lodash');

/**
 * Find order by id
 */
exports.order = function (req, res, next, id) {
    Order.load(id, function (err, order) {
        if (err) {
            return next(err);
        }

        if (!order) {
            return next(new Error('Failed to load order ' + id));
        }

        req.order = order;
        next();
    });
};

exports.orderByNumber = function (req, res, next) {
    var orderNumber = req.params.orderNumber;

    Order.loadByNumber(orderNumber, function (err, order) {
        if (err) {
            return next(err);
        }

        if (!order) {
            return next(new Error('Failed to load order ' + orderNumber));
        }

        req.order = order;
        next();
    });
};

/**
 * Create a order
 */
exports.create = function (req, res) {
    var order = new Order(req.body);

    if (req.user) {
        order.userId = req.user._id;
    }

    order.number = hat(64);
    order.token = hat(64);

    req.session.sc_currentOrderNumber = order.number;
    req.session.sc_currentOrderToken = order.token;

    order.save(function (err) {
        if (err) {
            return res.status(500).json(err);
        }

        res.status(201).json(hypermedia.orderHypermedia(order));
    });
};

/**
 * Update an order
 */
exports.update = function (req, res) {
    var order = req.order,
        lineItems = _.map(req.body.lineitems, function (lineitem) {
            return {
                variant: lineitem.variantId,
                quantity: lineitem.quantity
            };
        });

    order = _.extend(order, {
        lineItems: lineItems
    });

    order.save(function (err) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot update the order'
            });
        }
        res.status(200).json(order);
    });
};

/**
 * Delete an order
 */
exports.destroy = function (req, res) {
    var order = req.order;

    order.remove(function (err) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot delete the order'
            });
        }
        res.json(order);

    });
};

/**
 * Show a order
 */
exports.show = function (req, res) {
    var orderToken = req.query && req.query.order_token;

    if (!orderToken || orderToken !== req.order.token) {
        res.status(403).json({error: 'Unauthorized access to requested order.'})
    }

    res.status(200).json(hypermedia.orderHypermedia(req.order));
};

exports.showLineItems = function (req, res, next) {
    var order = req.order;

    order.populate('lineItems').exec(function (err, order) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot retrieve order items.'
            });
        }

        res.status(200).json(order.lineItems);
    });
};

exports.addLineItem = function (req, res) {
    var order = req.order,
        lineItem = req.body.lineitem;

    order.lineItems.push(lineItem);
    order.save(function (err, order) {
        var newestLineItem;

        if (err) {
            return res.status(500).json({
                error: 'Cannot add item to order.'
            });
        }

        newestLineItem = order.lineItems[order.lineItems.length - 1];
        res.status(201).json(hypermedia.lineItemHypermedia(order.number, order.populate('lineItems').lineItems.id(newestLineItem._id)));
    });
};

exports.updateLineItem = function (req, res) {
    var order = req.order;
};

exports.removeLineItem = function (req, res) {
    var order = req.order;
};

/**
 * List of Orders
 */
exports.all = function(req, res) {
    Order.find({})
        .exec(function(err, orders) {
            if (err) {
                return res.status(500).json({
                    error: 'Cannot list the orders'
                });
            }
            res.json(orders);
        });
};