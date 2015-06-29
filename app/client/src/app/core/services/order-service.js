define([
    'lodash'
], function (_) {
    'use strict';

    return {
        name: 'OrderService',
        fn: ['$rootScope', '$q', '$cookies', 'WebApi', 'LineItem', 'EVENTS', OrderService]
    };

    function OrderService($rootScope, $q, $cookies, WebApi, LineItem, EVENTS) {
        var self = this;

        self.init = function () {
            this.$order = {
                links: [],
                payload: {
                    _id: null,
                    lineItems: []
                }
            };

            console.log('init');

            return this.$order;
        };

        self.setOrderCookieKeys = function (cookieKeys) {
            this.currentOrderNumber = cookieKeys.orderNumber;
            this.currentOrderToken = cookieKeys.orderToken;
        };

        self.restore = function (root) {
            var dfd = $q.defer(),
                orderNumber = $cookies.get(this.currentOrderNumber),
                orderToken = $cookies.get(this.currentOrderToken);

            if (orderNumber && orderToken) {
                WebApi.orders.getCurrent(root.links)
                    .then(_successCb, _errorCb);
            } else {
                self.init();
                dfd.resolve(self);
            }

            function _successCb(order) {
                console.log('restore', order);
                self.setCurrentOrder(order);
                dfd.resolve(self);
            }

            function _errorCb(err) {
                dfd.reject(err);
            }

            return dfd.promise;
        };

        self.setCurrentOrder = function (order) {
            if (order) {
                this.$order = order;
            }

            return this.$order;
        };

        self.getCurrentOrder = function () {
            var dfd = $q.defer(),
                orderNumber = $cookies.get(this.currentOrderNumber);

            if (this.$order.payload._id) {
                dfd.resolve(this.$order);
            } else if (!orderNumber) {
                WebApi.orders
                    .create(WebApi.root.links, {data: {}})
                    .then(_successCb, _errorCb);
            } else {
                WebApi.orders
                    .getCurrent(WebApi.root.links)
                    .then(_successCb, _errorCb);
            }

            function _successCb(order) {
                dfd.resolve(self.setCurrentOrder(order));
            }

            function _errorCb(err) {
                dfd.reject(err);
            }

            return dfd.promise;
        };

        self.updateLineItem = function (lineitem) {
            var payload = {
                    lineitem: {
                        quantity: lineitem.payload.quantity + 1
                    }
                };

            return WebApi.lineitems.update(lineitem.links, {data: payload});
        };

        self.addLineItem = function (variant, quantity) {
            var dfd = $q.defer(),
                currentLineItem = this.findLineItemByVariant(variant);

            if (currentLineItem) {
                self.updateLineItem(currentLineItem)
                    .then(_successLineItemCb, _errorLineItemCb);
            } else {
                self.getCurrentOrder()
                    .then(_successOrderCb, _errorOrderCb)
                    .then(_successLineItemCb, _errorLineItemCb);
            }

            // Add the line item upon successful order GET response
            function _successOrderCb(order) {
                return WebApi.orders.addLineItem(order.links, {
                    data: {
                        lineitem: {
                            variantId: variant.payload._id,
                            quantity: quantity || 1
                        }
                    }
                });
            }

            function _successLineItemCb(order) {
                dfd.resolve(self.setCurrentOrder(order));
            }

            // Return the err promise to the next catch
            function _errorOrderCb(err) {
                // TODO: Handle GET order error
                return $q.reject(err);
            }

            function _errorLineItemCb(err) {
                // TODO: Handle POST lineitem error
                dfd.reject(err);
            }

            return dfd.promise;
        };

        self.getLineItems = function () {
            var dfd = $q.defer(),
                order = this.$order;

            WebApi.orders.getLineItems(order.links)
                .then(function (lineItems) {
                    dfd.resolve(lineItems);
                });

            return dfd.promise;
        };

        self.findLineItemByVariant = function (variant) {
            var order = this.$order,
                lineItem = null;

            if (order && order.payload._id) {
                lineItem = _.find(order.payload.lineItems, function (lineItem) {
                    return lineItem.payload.variant === variant.payload._id;
                });
            }

            return lineItem;
        };

        self.getTotalItems = function () {
            var itemCount = 0;

            _.each(this.$order.payload.lineItems, function (item) {
                itemCount += item.payload.quantity;
            });

            return itemCount;
        };
    }
});