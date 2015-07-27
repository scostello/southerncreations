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
 *
 * @param req
 * @param res
 * @param next
 */
exports.orderByNumber = function (req, res, next) {
    var orderNumber = req.params.orderNumber,
        params = _.clone(req.params);

    Order.loadByNumber(orderNumber)
        .then(function (order) {
            req.params = params;
            req.order = order;
            next();
        }, function (err) {
            err.status = 404;
            next(err);
        });
};

/**
 * Validate the requested order with the passed order_token
 * @param req
 * @param res
 * @param next
 */
exports.orderIsValid = function (req, res, next) {
    var order = req.order,
        query = req.query,
        body = req.body,
        orderToken, err;

    // Try to extract a passed order token
    orderToken = query && query.order_token || body && body.order_token;

    // Compare passed order_token with the associated order token
    if (!orderToken || orderToken !== order.token) {
        err = new Error('Unauthorized access to requested order.');
        err.status = 403;
        next(err);
    }

    next();
};

/**
 * Create a new order
 * @param req
 * @param res
 * @param next
 */
exports.create = function (req, res, next) {
    var order = new Order(req.body);

    if (req.user) {
        order.userId = req.user._id;
        order.email = req.user.email;
    }

    order.number = hat(64);
    order.token = hat(64);

    order.save()
        .then(function (order) {
            res.status(201).json(hypermedia.orderHypermedia(order));
        }, function (err) {
            err.message = 'Cannot create the order';
            err.status = 500;
            next(err);
        });
};

/**
 * Update a current order
 * @param req
 * @param res
 * @param next
 */
exports.update = function (req, res, next) {
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

    order.save()
        .then(function (order) {
            res.status(200).json(hypermedia.orderHypermedia(order));
        }, function (err) {
            err.message = 'Cannot update the order';
            err.status = 500;
            next(err);
        });
};

/**
 * Delete the current order
 * @param req
 * @param res
 * @param next
 */
exports.destroy = function (req, res, next) {
    var order = req.order;

    order.remove(function (order) {
        res.status(204).json(hypermedia.orderHypermedia(order));
    }, function (err) {
        err.message = 'Cannot delete the order';
        err.status = 500;
        next(err);
    });
};

/**
 * Return the requested order
 * @param req
 * @param res
 */
exports.show = function (req, res) {
    var order = req.order,
        orderObj = order.toObject();

    orderObj.lineItems = _.map(order.lineItems, function (lineItem) {
        return hypermedia.lineItemHypermedia(order.number, lineItem);
    });

    res.status(200).json(hypermedia.orderHypermedia(orderObj));
};

/**
 * Add line item to current order
 * @param req
 * @param res
 * @param next
 */
exports.addLineItem = function (req, res, next) {
    var order = req.order,
        lineitem = req.body.lineitem,
        newLineItem = new LineItem({variant: lineitem.variantId, quantity: lineitem.quantity});

    newLineItem.save()
        .then(function (lineItem) {
            order.lineItems.push(lineItem);
            return order.save();
        }, function (err) {
            err.message = 'Unable to create new lineitem.';
            err.status = 500;
            next(err);
        })
        .then(function (order) {
            return order.populate({path: 'lineItems.variant', model: 'ProductVariant'}).execPopulate();
        }, function (err) {
            err.message = 'Unable to add lineitem in order.';
            err.status = 500;
            next(err);
        })
        .then(function (order) {
            var orderObj = order.toObject();

            orderObj.lineItems = _.map(order.lineItems, function (lineItem) {
                return hypermedia.lineItemHypermedia(order.number, lineItem);
            });

            res.status(200).json(hypermedia.orderHypermedia(orderObj));
        }, function (err) {
            err.message = 'Unable to add populate lineitem for order.';
            err.status = 500;
            next(err);
        });
};

/**
 * Update a line item within the current order
 * @param req
 * @param res
 * @param next
 */
exports.updateLineItem = function (req, res, next) {
    var order = req.order,
        lineItem = _.find(order.lineItems, function (lineItem) {
            return req.params.lineItemId.toString() === lineItem._id.toString();
        }),
        lineItemPayload = req.body.lineitem,
        err;

    if (!lineItem) {
        err = new Error('Could not find specified lineitem.');
        err.status = 500;
        next(err);
    }

    lineItem.quantity = lineItemPayload.quantity;
    lineItem.save()
        .then(function () {
            var orderObj = order.toObject();

            orderObj.lineItems = _.map(order.lineItems, function (lineItem) {
                return hypermedia.lineItemHypermedia(order.number, lineItem);
            });

            res.status(200).json(hypermedia.orderHypermedia(orderObj));
        }, function (err) {
            err.message = 'Unable to update lineitem quantity.';
            err.status = 500;
            next(err);
        });
};

/**
 * Remove a line item from the current order
 * @param req
 * @param res
 * @param next
 */
exports.removeLineItem = function (req, res, next) {
    var order = req.order,
        lineItem = _.find(order.lineItems, function (lineItem) {
            return req.params.lineItemId.toString() === lineItem._id.toString();
        }),
        err;

    if (!lineItem) {
        err = new Error('Could not find specified lineitem.');
        err.status = 500;
        next(err);
    }

    order.lineItems.pull({_id: lineItem._id});
    order.save()
        .then(function () {
            res.status(204).json({});
        }, function (err) {
            err.message = 'Unable to delete lineitem.';
            err.status = 500;
            next(err);
        });
};

/**
 * List all orders
 * @param req
 * @param res
 * @param next
 */
exports.all = function(req, res, next) {
    Order.find({}).exec()
        .then(function (orders) {
            var hmList = _.map(orders, function (order) {
                return hypermedia.orderHypermedia(order);
            });

            res.status(200).json(hmList);
        }, function (err) {
            err.message = 'Unable to retrieve orders.';
            err.status = 500;
            next(err);
        });
};