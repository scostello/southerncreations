define(function () {
    'use strict';

    return {
        name: 'ProductsService',
        fn: ['$http', 'API', function ($http, API) {
            this.getProducts = getProducts;
            this.getVariantById = getVariantById;
            this.getVariantBySlug = getVariantBySlug;
            this.getVariantBySku = getVariantBySku;

            function getProducts() {
                return $http.get('/api/products');
            }

            function getVariantById(id) {
                return $http.get('/api/products/' + id);
            }

            function getVariantBySlug(slug) {
                return $http.get('/api/products/' + slug, {headers: {'X-ALTERNATE-IDENTIFIER': 'slug'}});
            }

            function getVariantBySku(sku) {
                return $http.get('/api/products/' + sku, {headers: {'X-ALTERNATE-IDENTIFIER': 'sku'}});
            }
        }]
    };
});