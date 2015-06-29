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
        var orderObj = order.toObject();

        if (err) {
            return next(err);
        }

        if (!order) {
            return next(new Error('Failed to load order ' + orderNumber));
        }

        orderObj.lineItems = _.map(order.lineItems, function (lineItem) {
            return hypermedia.lineItemHypermedia(order.number, lineItem);
        });

        req.orderObj = orderObj;
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

    res.status(200).json(hypermedia.orderHypermedia(req.orderObj));
};

exports.showLineItems = function (req, res) {
    var order = req.order;

    order.populate('lineItems').execPopulate()
        .then(function (order) {
            return LineItem.populate(order.lineItems, {path: 'variant', model: 'ProductVariant'});
        })
        .then(function (lineItems) {
            var hmList = _.map(lineItems, function (lineItem) {
                return hypermedia.lineItemHypermedia(order.number, lineItem);
            });

            res.status(200).json(hmList);
        });
};

exports.addLineItem = function (req, res) {
    var order = req.order,
        lineitem = req.body.lineitem,
        newLineItem = new LineItem({variant: lineitem.variantId, quantity: lineitem.quantity});

    newLineItem.save()
        .then(function (lineItem) {
            order.lineItems.push(lineItem);
            return Q.all([order.save(), lineItem.populate('variant').execPopulate()]);
        })
        .then(function (results) {
            var orderObj = results[0].toObject(),
                lineItemObj = results[1].toObject();

            orderObj.lineItems = _.map(orderObj.lineItems, function (lineItem) {
                if (lineItem._id.toString() === lineItemObj._id.toString()) {
                    lineItem.isNew = true;
                }

                return hypermedia.lineItemHypermedia(orderObj.number, lineItem);
            });

            res.status(200).json(hypermedia.orderHypermedia(orderObj));
        });
};

exports.updateLineItem = function (req, res) {
    var order = req.order,
        lineItemId = req.params.lineItemId,
        payload = req.body.lineitem;

    LineItem.findOne({_id: lineItemId}).exec()
        .then(function (lineItem) {
            lineItem.quantity = payload.quantity;
            return lineItem.save();
        })
        .then(function (lineItem) {
            return Order.findOne({_id: order._id}).populate('lineItems').exec();
        })
        .then(function (order) {
            var orderObj = order.toObject();

            orderObj.lineItems = _.map(order.lineItems, function (lineItem) {
                return hypermedia.lineItemHypermedia(order.number, lineItem);
            });

            res.status(200).json(hypermedia.orderHypermedia(orderObj));
        });
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