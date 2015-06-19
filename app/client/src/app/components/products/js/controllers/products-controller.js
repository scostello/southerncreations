define(function () {
    'use strict';

    return {
        name: 'ProductsController',
        fn: ['$state', 'menu', 'UserService', function ($state, menu, UserService) {
            var vm = this;
            vm.products = menu.products;
            vm.addItemToCart = UserService.addItemToCart;
        }]
    };
});