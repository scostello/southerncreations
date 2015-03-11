define(function () {
    'use strict';

    return {
        name: 'ProductsService',
        fn: ['Restangular', 'API', function (Restangular, API) {
            var productsBase = Restangular.all(API.BASE_PRODUCTS);

            this.getProducts = getProducts;

            function getProducts() {
                return productsBase.getList();
            }
        }]
    };
});