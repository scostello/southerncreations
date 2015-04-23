define(function () {
    'use strict';

    return {
        name: 'ShoppingService',
        fn: ['$rootScope', 'STORAGE_KEYS', 'localStorageService', ShoppingService]
    };

    function ShoppingService($rootScope, STORAGE_KEYS, localStorageService) {
        var self = this;

        self.addItemToCart = addItemToCart;
        self.removeItemFromCart = removeItemFromCart;
        self.getCartItems = getCartItems;

        function addItemToCart(product) {
            localStorageService.set(STORAGE_KEYS.CART, product);
            _broadcastCartUpdate();
        }

        function removeItemFromCart() {

        }

        function getCartItems() {
            return localStorageService.get(STORAGE_KEYS.CART);
        }

        function _broadcastCartUpdate() {
            $rootScope.$broadcast('cart:update', self.getCartItems());
        }
    }
});