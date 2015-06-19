define(function () {
    'use strict';

    ShoppingService.$inject = ['$rootScope', 'EVENTS', 'ShoppingCart'];
    function ShoppingService($rootScope, EVENTS, ShoppingCart) {
        var self = this,
            shoppingCart = new ShoppingCart();

        self.shoppingCart = shoppingCart;
        self.addItemToCart = _broadcastCartUpdate(shoppingCart.addItem);
        self.updateItemInCart = _broadcastCartUpdate(shoppingCart.updateItem);
        self.removeItemFromCart = _broadcastCartUpdate(shoppingCart.removeItem);

        function _broadcastCartUpdate(func) {
            return function () {
                var args = Array.prototype.slice.call(arguments);
                func.apply(shoppingCart, args);
                $rootScope.$broadcast(EVENTS.CART_UPDATED, shoppingCart);
            };
        }
    }

    return {
        name: 'ShoppingService',
        fn: ShoppingService
    };
});