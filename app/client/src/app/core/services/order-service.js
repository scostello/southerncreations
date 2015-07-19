define([
    'lodash'
], function (_) {
    'use strict';

    return {
        name: 'OrderService',
        fn: ['$rootScope', '$q', '$cookies', 'WebApi', 'EVENTS', OrderService]
    };

    function OrderService($rootScope, $q, $cookies, WebApi, EVENTS) {
        var self = this;

        self.$order = {};

        /**
         * Initialize an empty $order object
         * @returns {{links: Array, payload: {_id: null, lineItems: Array}}|*}
         */
        self.init = function () {
            this.$order = {
                links: [],
                payload: {
                    _id: null,
                    lineItems: []
                }
            };

            return this.$order;
        };

        /**
         * Getter/setter for $order object
         * @param order
         * @returns {{links: Array, payload: {_id: null, lineItems: Array}}|*}
         */
        self.order = function (order) {
            if (order) {
                this.$order = order;
            }

            return this.$order;
        };

        /**
         * Set the cookie names for the
         * @param cookieKeys
         */
        self.setOrderCookieKeys = function (cookieKeys) {
            this.currentOrderNumber = cookieKeys && cookieKeys.orderNumber || null;
            this.currentOrderToken = cookieKeys && cookieKeys.orderToken || null;
        };

        /**
         * On application startup, we use the root api object to restore a previsouly saved order
         * @param root
         * @returns {Promise}
         */
        self.restore = function (root) {
            var dfd = $q.defer(),
                orderNumber = $cookies.get(this.currentOrderNumber),
                orderToken = $cookies.get(this.currentOrderToken);

            if (orderNumber && orderToken) {
                WebApi.orders.getCurrent(root.links, {override: ['/api/orders', orderNumber].join('/') + '?order_token=' + orderToken})
                    .then(_successCb, _errorCb);
            } else {
                dfd.resolve(this.init());
            }

            function _successCb(order) {
                dfd.resolve(self.order(order));
            }

            function _errorCb(err) {
                dfd.reject(err);
            }

            return dfd.promise;
        };

        /**
         * Returns a promise that resolves to an order object
         * @returns {Promise}
         */
        self.getCurrentOrder = function () {
            var dfd = $q.defer();

            if (this.order().links.length > 0) {
                dfd.resolve(self.order());
            } else {
                WebApi.orders.create(WebApi.root.links, {data: {}})
                    .then(_successCb, _errorCb);
            }

            function _successCb(order) {
                $cookies.put(self.currentOrderNumber, order.payload.number);
                $cookies.put(self.currentOrderToken, order.payload.token);
                dfd.resolve(self.order(order));
            }

            function _errorCb(err) {
                dfd.reject(err);
            }

            return dfd.promise;
        };

        /**
         * Adds a lineitem to the current order
         * @param variant
         * @param quantity
         * @returns {Promise}
         */
        self.addLineItem = function (variant, quantity) {
            var dfd = $q.defer(),
                currentLineItem = this.findLineItemByVariant(variant);

            if (currentLineItem) {
                this.updateLineItem(currentLineItem, currentLineItem.payload.quantity + quantity)
                    .then(_successLineItemCb, _errorLineItemCb);
            } else {
                this.getCurrentOrder()
                    .then(_successOrderCb, _errorOrderCb)
                    .then(_successLineItemCb, _errorLineItemCb);
            }

            function _successOrderCb(order) {
                return WebApi.orders.addLineItem(order.links, {
                    data: {
                        lineitem: {
                            variantId: variant.payload._id,
                            quantity: quantity || 1
                        },
                        order_token: order.payload.token
                    }
                });
            }

            function _successLineItemCb(order) {
                dfd.resolve(self.order(order));
            }

            function _errorOrderCb(err) {
                dfd.reject(err);
            }

            function _errorLineItemCb(err) {
                dfd.reject(err);
            }

            return dfd.promise;
        };

        /**
         * Update a lineitem with the specified payload
         * @param lineitem
         * @param payload
         * @returns {Promise}
         */
        self.updateLineItem = function (lineitem, quantity) {
            var payload = {
                lineitem: {
                    quantity: quantity
                },
                order_token: $cookies.get(this.currentOrderToken)
            };
            return WebApi.lineitems.update(lineitem.links, {data: payload});
        };

        /**
         * Removes the passed in lineitem from the current order
         * @param lineItem
         * @returns {Promsie}
         */
        self.removeLineItem = function (lineItem) {
            var dfd = $q.defer(),
                currentLineItem = this.findLineItemById(lineItem.payload._id),
                payload = {
                    order_token: $cookies.get(this.currentOrderToken)
                };

            WebApi.lineitems.delete(lineItem.links, {data: payload})
                .then(_successDeleteCb, _errorDeleteCb);

            function _successDeleteCb() {
                _.remove(self.order().payload.lineItems, function (lineItem) {
                    return currentLineItem.payload._id === lineItem.payload._id;
                });
                dfd.resolve();
            }

            function _errorDeleteCb(err) {
                dfd.reject(err);
            }

            return dfd.promise;
        };

        /**
         * Returns a promise that resolves to an array of lineitems associated with the current order
         * @returns {Promise}
         */
        self.getLineItems = function () {
            var dfd = $q.defer(),
                order = self.order();

            WebApi.orders.getLineItems(order.links)
                .then(function (lineItems) {
                    order.payload.lineItems = lineItems;
                    dfd.resolve(lineItems);
                });

            return dfd.promise;
        };

        /**
         * Returns a lineitem associated with the current order
         * @param variant
         * @returns {lineItem|null}
         */
        self.findLineItemByVariant = function (variant) {
            var order = this.order(),
                lineItem = null;

            if (order && order.payload.lineItems.length > 0) {
                lineItem = _.find(order.payload.lineItems, function (lineItem) {
                    return lineItem.payload.variant._id === variant.payload._id;
                });
            }

            return lineItem;
        };

        self.findLineItemById = function (id) {
            var order = this.order(),
                lineItem = null;

            if (order && order.payload.lineItems.length > 0) {
                lineItem = _.find(order.payload.lineItems, function (lineItem) {
                    return lineItem.payload._id === id;
                });
            }

            return lineItem;
        };

        /**
         * Returns the count of unique lineitems in the current order
         * @returns {number}
         */
        self.getTotalItems = function () {
            var itemCount = 0;

            _.each(this.order().payload.lineItems, function (lineItem) {
                itemCount += lineItem.payload.quantity;
            });

            return itemCount;
        };

        /**
         * Returns the price total for all the lineitems in the current order
         * @returns {number}
         */
        self.getOrderTotal = function () {
            var itemTotal = 0.0;

            _.each(this.order().payload.lineItems, function (lineItem) {
                itemTotal += lineItem.payload.quantity * lineItem.payload.variant.pricing.price;
            });

            return itemTotal;
        };

        /**
         * Returns the current order's listItems
         * @returns {Array}
         */
        self.getOrderItems = function () {
            return this.order().payload.lineItems;
        };

        /**
         * Check if the current order has a userId or email attached
         * @returns {boolean}
         */
        self.isRegistered = function () {
            var order = this.order(),
                uid = order.payload.userId,
                email = order.payload.email;

            return !!(uid || email);
        };

        /**
         * Request a braintree client token
         * @returns {*}
         */
        self.getPaymentToken = function () {
            var order = this.order();
            return WebApi.orders.getPaymentToken(order.links);
        };

        /**
         * Advances the order to the next state in the checkout state machine
         * @param payload
         * @returns {*}
         */
        self.nextOrderState = function (payload) {
            var self = this,
                dfd = $q.defer(),
                order = this.order(),
                orderToken = $cookies.get(self.currentOrderToken);

            WebApi.checkouts.nextState(order.links, {data: payload, params: {order_token: orderToken}})
                .then(function (order) {
                    dfd.resolve(self.order(order));
                })
                .catch(function (err) {
                    dfd.reject(err);
                });

            return dfd.promise;
        };
    }
});