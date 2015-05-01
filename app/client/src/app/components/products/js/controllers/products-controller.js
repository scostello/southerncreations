define(function () {
    'use strict';

    return {
        name: 'ProductsController',
        fn: ['$state', 'menu', 'ShoppingService', function ($state, menu, ShoppingService) {
            var vm = this;

            vm.products = menu.products;
            vm.addItemToCart = ShoppingService.addItemToCart;
        }]
    };
});