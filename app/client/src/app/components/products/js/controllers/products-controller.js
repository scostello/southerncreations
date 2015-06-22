define(function () {
    'use strict';

    return {
        name: 'ProductsController',
        fn: ['products', function (products) {
            var vm = this;
            vm.products = products;
        }]
    };
});