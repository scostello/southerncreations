define(function () {
    'use strict';

    return {
        name: 'ProductsService',
        fn: ['$http', 'API', function ($http, API) {
            this.getCategories = getCategories;
            this.getProducts = getProducts;

            function getCategories() {
                return $http({
                    method: 'GET',
                    url: '/api/categories'
                });
            }

            function getProducts() {
                return $http({
                    method: 'GET',
                    url: '/api/products'
                });
            }
        }]
    };
});