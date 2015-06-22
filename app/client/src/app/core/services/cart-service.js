define([
    'lodash'
], function (_) {
    'use strict';

    return {
        name: 'ShoppingCartService',
        fn: ['$rootScope', '$http', '$q', '$cookies', 'WebApi', 'CartItem', 'EVENTS', ShoppingCartService]
    };

    function ShoppingCartService($rootScope, $http, $q, $cookies, WebApi, CartItem, EVENTS) {
        var self = this;

        self.init = function () {
            this.$cart = {
                status: null,
                modifiedOn: null,
                shipping: null,
                taxRate: null,
                tax: null,
                items: []
            };
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
                self.setCart(order);
                dfd.resolve(self);
            }

            function _errorCb(err) {
                dfd.reject(err);
            }

            return dfd.promise;
        };

        self.createOrder = function (links, data) {
            var dfd = $q.defer();

            WebApi.orders.createOrder(links, {data: data})
                .then(_successCb, _errorCb);

            function _successCb(order) {
                self.setCart(order);
                dfd.resolve(self);
            }

            function _errorCb(err) {
                dfd.reject(err);
            }

            return dfd.promise;
        };

        self.setCart = function (cart) {
            if (cart) {
                this.$cart = cart;
            }

            return this.getCart();
        };

        self.getCart = function () {
            return this.$cart;
        };

        self.setShipping = function (shipping) {
            this.getCart().shipping = shipping;
            return this.getShipping();
        };

        self.getShipping = function () {
            var shipping = 0;
            if (this.getCart().items.length > 0) {
                shipping = this.getCart().shipping;
            }

            return shipping;
        };

        self.setTaxRate = function (taxRate) {
            this.getCart().taxRate = +parseFloat(taxRate).toFixed(2);
            return this.getTaxRate();
        };

        self.getTaxRate = function () {
            return this.getCart().taxRate;
        };

        self.getTax = function () {
            return +parseFloat(((this.getSubTotal() / 100) * this.getCart().taxRate)).toFixed(2);
        };

        self.getSubTotal = function () {
            var subtotal = 0;

            _.each(self.getCart().items, function (item) {
                subtotal += item.getTotal();
            });

            return subtotal;
        };

        self.getTotalItems = function () {
            var itemCount = 0;

            _.each(this.getCart().items, function (item) {
                itemCount += item.getQuantity();
            });

            return itemCount;
        };

        self.getTotalUniqueItems = function () {
            return this.getCart().items.length;
        };

        self.getTotalCost = function () {
            return +parseFloat(this.getSubTotal() + this.getTax() + this.getShipping).toFixed(2);
        };

        self.addItem = function (id, name, price, quantity, data) {
            var currentItem = this.getItemById(id),
                orderNumber = $cookies.get('sc_currentOrderNumber'),
                newItem;

            if (!orderNumber) {
                this.createOrder()
                    .then(function (order) {

                    }, function (err) {

                    })
            } else {
                console.log('already created an order');
            }

            if (currentItem) {
                currentItem.setQuantity(quantity, true);
            } else {
                newItem = new CartItem(id, name, price, quantity, data);
                this.getCart().items.push(newItem);
                //$rootScope.$broadcast(EVENTS.CART_ITEM_ADDED, newItem);
            }

            //$rootScope.$broadcast(EVENTS.CART_UPDATED, {});
        };

        self.removeItemById = function (id) {
            var cart = this.getCart(),
                itemIndex = _.findIndex(cart.items, function (item) {
                    return item.getId() === id;
                });

            if (itemIndex !== -1) {
                cart.items.splice(itemIndex, 1);
                this.setCart(cart);
                $rootScope.$broadcast(EVENTS.CART_ITEM_REMOVED, {});
                $rootScope.$broadcast(EVENTS.CART_UPDATED, {});
            }
        };

        self.getItemById = function (id) {
            return _.find(this.getCart().items, function (item) {
                return item.getId() === id;
            });
        };

        self.emptyCart = function () {
            this.getCart().items = [];
            $rootScope.$broadcast(EVENTS.CART_UPDATED, {});

            // Remove cart from session
        };

        self.toObject = function () {
            var items = this.getCart().items,
                itemObjs = [];

            if (items < 1) {
                return;
            }

            _.each(items, function (item) {
                itemObjs.push(item.toObject());
            });

            return {
                status: null,
                modifiedOn: null,
                shipping: this.getShipping(),
                taxRate: this.getTaxRate(),
                tax: this.getTax(),
                items: itemObjs
            };
        };
    }
});