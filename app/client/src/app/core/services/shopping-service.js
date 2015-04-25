define([
    'lodash'
],
function (_) {
    'use strict';

    return {
        name: 'ShoppingService',
        fn: ['$rootScope', 'STORAGE_KEYS', 'localStorageService', ShoppingService]
    };

    function ShoppingService($rootScope, STORAGE_KEYS, localStorageService) {
        var self = this;

        self.addItemToCart = addItemToCart;
        self.removeItemFromCart = removeItemFromCart;
        self.getShoppingCart = getShoppingCart;

        function addItemToCart(product) {
            var shoppingCart = self.getShoppingCart();

            if (!shoppingCart.items[product.slug]) {
                shoppingCart.items[product.slug] = _.assign({}, product, {
                    count: 1
                });
                shoppingCart.count++;
            } else {
                shoppingCart.items[product.slug].count++;
                shoppingCart.count++;
            }

            localStorageService.set(STORAGE_KEYS.CART, shoppingCart);
            _broadcastCartUpdate();
        }

        function removeItemFromCart() {

        }

        function getShoppingCart() {
            return localStorageService.get(STORAGE_KEYS.CART) || {count: 0, items: {}};
        }

        function _broadcastCartUpdate() {
            $rootScope.$broadcast('cart:updated', self.getShoppingCart());
        }
    }
});