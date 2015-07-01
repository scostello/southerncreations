define(function () {
    'use strict';

    return {
        name: 'ProductsService',
        fn: ['$http', 'WebApi', function ($http, WebApi) {
            var self = this;

            self.getProducts = getProducts;
            self.getVariants = getVariants;

            function getProducts(root) {
                return WebApi.products.getAll(root.links);
            }

            function getVariants(product) {
                return WebApi.products.getVariants(product.links);
            }
        }]
    };
});