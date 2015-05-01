define(function () {
    'use strict';

    return {
        name: 'ProductsService',
        fn: ['Restangular', 'API', function (Restangular, API) {
            var categoriesBase = Restangular.all(API.BASE_CATEGORIES),
                productsBase = Restangular.all(API.BASE_PRODUCTS);

            this.getCategories = getCategories;
            this.getProducts = getProducts;

            function getCategories() {
                return categoriesBase.getList();
            }

            function getProducts() {
                return productsBase.getList();
            }
        }]
    };
});