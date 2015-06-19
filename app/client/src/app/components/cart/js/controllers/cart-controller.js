define(function () {
    'use strict';

    return {
        name: 'CartController',
        fn: [CartController]
    };

    function CartController() {
        var vm = this;

        vm.updateItem = _updateProduct;
        vm.removeItem = _removeItem;

        function _updateProduct(product) {
            vm.shoppingCart.updateItem(product);
            vm.cartTotal = vm.shoppingCart.getCartTotal();
        }

        function _removeItem(product) {
            vm.shoppingCart.removeItem(product);
            vm.cartTotal = vm.shoppingCart.getCartTotal();
        }
    }
});