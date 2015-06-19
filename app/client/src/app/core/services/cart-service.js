define([
    'lodash'
], function (_) {
    'use strict';

    return {
        name: 'ShoppingCartService',
        fn: ['$rootScope', '$http', 'CartItem', 'EVENTS', ShoppingCartService]
    };

    function ShoppingCartService($rootScope, $http, CartItem, EVENTS) {
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

        self.restore = function (storedCart) {
            var self = this;
            self.init();
            self.$cart.shipping = storedCart.shipping;
            self.$cart.taxRate = storedCart.taxRate;
            self.$cart.tax = storedCart.tax;

            _.each(storedCart.items, function (item) {
                self.$cart.items.push(new CartItem(item.getId(), item.getName(), item.getPrice(), item.getQuantity(), item.getData()));
            });

            self.save();
        };

        self.save = function () {
            return $http.post('/api/carts', this.getCart().toObject());
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
                newItem;
            if (currentItem) {
                currentItem.setQuantity(quantity, false);
            } else {
                newItem = new CartItem(id, name, price, quantity, data);
                this.getCart().items.push(newItem);
                $rootScope.$broadcast(EVENTS.CART_ITEM_ADDED, newItem);
            }

            $rootScope.$broadcast(EVENTS.CART_UPDATED, {});
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