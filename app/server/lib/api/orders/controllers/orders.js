'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Q = require('q'),
    Order = mongoose.model('Order'),
    LineItem = mongoose.model('LineItem'),
    Product = mongoose.model('Product'),
    hypermedia = require('../../utils/hypermedia.js'),
    hat = require('hat'),
    _ = require('lodash');

exports.verifyOrderToken = function (req, res, next) {
    var order = req.order,
        orderToken = req.body.order_token;

    next();
};

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

    Order.loadByNumber(orderNumber)
        .then(function (order) {
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

exports.tagOrder = function (req, res) {
    var order = req.order,
        orderToken = req.query && req.query.order_token,
        email = req.body.email;

    if (!orderToken || orderToken !== order.token) {
        res.status(403).json({error: 'Unauthorized access to requested order.'})
    }

    order.email = email;
    order.save()
        .then(function () {
            req.status(200).json(hypermedia.orderHypermedia(order));
        });
};

/**
 * Delete an order
 */
exports.destroy = function (req, res) {
    var order = req.order;

    order.remove(function (err) {
        if (err) {
            return res.status(500).json({error: 'Cannot delete the order'});
        }

        res.status(204).json(order);
    });
};

/**
 * Show a order
 */
exports.show = function (req, res) {
    var order = req.order,
        orderObj = order.toObject(),
        orderToken = req.query && req.query.order_token;

    if (!orderToken || orderToken !== order.token) {
        res.status(403).json({error: 'Unauthorized access to requested order.'})
    }

    orderObj.lineItems = _.map(order.lineItems, function (lineItem) {
        return hypermedia.lineItemHypermedia(order.number, lineItem);
    });

    console.log(orderObj.lineItems);

    res.status(200).json(hypermedia.orderHypermedia(orderObj));
};

exports.addLineItem = function (req, res) {
    var order = req.order,
        lineitem = req.body.lineitem,
        newLineItem = new LineItem({variant: lineitem.variantId, quantity: lineitem.quantity});

    newLineItem.save()
        .then(function (lineItem) {
            order.lineItems.push(lineItem);
            return order.save();
        })
        .then(function (order) {
            return order.populate({path: 'lineItems.variant', model: 'ProductVariant'}).execPopulate();
        })
        .then(function (order) {
            var orderObj = order.toObject();

            orderObj.lineItems = _.map(order.lineItems, function (lineItem) {
                return hypermedia.lineItemHypermedia(order.number, lineItem);
            });

            res.status(200).json(hypermedia.orderHypermedia(orderObj));
        });
};

exports.updateLineItem = function (req, res) {
    var order = req.order,
        lineItem = _.find(order.lineItems, function (lineItem) {
            return req.params.lineItemId.toString() === lineItem._id.toString();
        }),
        lineItemPayload = req.body.lineitem,
        orderToken = req.body.order_token;

    if (!lineItem) {
        res.status(500).json({error: 'Could not find specified lineitem.'});
    }

    if (order.token !== orderToken) {
        res.status(403).json({error: 'Unauthorized access to requested order.'});
    }

    lineItem.quantity = lineItemPayload.quantity;
    lineItem.save()
        .then(function () {
            var orderObj = order.toObject();

            orderObj.lineItems = _.map(order.lineItems, function (lineItem) {
                return hypermedia.lineItemHypermedia(order.number, lineItem);
            });

            res.status(200).json(hypermedia.orderHypermedia(orderObj));
        });
};

exports.removeLineItem = function (req, res) {
    var order = req.order,
        lineItem = _.find(order.lineItems, function (lineItem) {
            return req.params.lineItemId.toString() === lineItem._id.toString();
        }),
        orderToken = req.body.order_token;

    if (!lineItem) {
        res.status(500).json({error: 'Could not find specified lineitem.'});
    }

    if (order.token !== orderToken) {
        res.status(403).json({error: 'Unauthorized access to requested order.'});
    }

    order.lineItems.pull({_id: lineItem._id});
    order.save()
        .then(function () {
            res.status(204).json({});
        });
};

/**
 * List of Orders
 */
exports.all = function(req, res) {
    Order.find({}).exec()
        .then(function (orders) {
            var hmList = _.map(orders, function (order) {
                return hypermedia.orderHypermedia(order);
            });

            res.status(200).json(hmList);
        });
};