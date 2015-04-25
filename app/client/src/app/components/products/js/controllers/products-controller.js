define(function () {
    'use strict';

    return {
        name: 'ProductsController',
        fn: ['$state', 'products', 'ShoppingService', function ($state, products, ShoppingService) {
            var vm = this;

            vm.products = products;
            vm.addItemToCart = ShoppingService.addItemToCart;
            vm.showProductDetails = showProductDetails;

            function showProductDetails(slug) {
                $state.go('app.products.details', slug);
            }
        }]
    };
});