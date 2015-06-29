define([
    'lodash'
], function (_) {
    'use strict';

    LineItemFactory.$inject = ['$rootScope', '$log'];
    function LineItemFactory($rootScope, $log) {

        var LineItem = function (lineItem) {
            var self = this;

            if (!(self instanceof LineItem)) {
                return new LineItem(lineItem);
            }

            self.setLinks(lineItem.links);
            self.setPayload(lineItem.payload);
        };

        _.assign(LineItem.prototype, {
            setLinks: function (links) {
                this._links = links;
            },
            setPayload: function (payload) {
                this._payload = payload;
            },
            setId: function (id) {
                if (id) {
                    this._id = id;
                } else {
                    $log.error('An id must be supplied for CartItem.');
                }
            },
            getId: function () {
                return this._id;
            },
            setName: function (name) {
                if (name) {
                    this._name = name;
                } else {
                    $log.error('A name must be supplied for CartItem.');
                }
            },
            getName: function () {
                return this._name;
            },
            setPrice: function (price) {
                price = parseFloat(price);

                if (price && _.isNumber(price)) {
                    this._price = price;
                } else {
                    $log.error('A price must be supplied for CartItem.');
                }
            },
            getPrice: function () {
                return this._price;
            },
            setQuantity: function (quantity, relative) {
                quantity = parseInt(quantity, 10);
                if (quantity > 0) {
                    if (relative) {
                        this._quantity += quantity;
                    } else {
                        this._quantity = quantity;
                    }
                } else {
                    $log.warn('A positive quantity must be supplied. Quantity is set to default of 1.');
                    this._quantity = 1;
                }

                $rootScope.$broadcast('cart:updated', {});
            },
            getQuantity: function () {
                return this._quantity;
            },
            setData: function (data) {
                if (data) {
                    this._data = data;
                }
            },
            getData: function () {
                if (this._data) {
                    return this._data;
                } else {
                    $log.warn('No data is assigned to the CartItem');
                }
            },
            getTotal: function () {
                return +parseFloat(this._price * this._quantity);
            },
            toObject: function () {
                return {
                    id: this.getId(),
                    name: this.getName(),
                    price: this.getPrice(),
                    quantity: this.getQuantity(),
                    data: this.getData(),
                    total: this.getTotal()
                };
            }
        });

        return LineItem;
    }

    return {
        name: 'LineItem',
        fn: LineItemFactory
    };

});