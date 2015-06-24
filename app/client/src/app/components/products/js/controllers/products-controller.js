define([
    'lodash'
], function (_) {
    'use strict';

    return {
        name: 'ProductsController',
        fn: ['$scope', '$state', 'products', 'WebApi', function ($scope, $state, products, WebApi) {
            var vm = this;
            vm.products = products;
            vm.currentProduct = null;
            vm.variants = [];
            vm.currentVariant = null;

            $scope.$watch(function () {
                return vm.currentProduct;
            }, function (currentProduct) {
                if (currentProduct) {
                    WebApi.products.getVariants(currentProduct.links)
                        .then(_successVariantsCb, _errorVariantsCb);
                }
            });

            if ($state.params.productSlug) {
                vm.currentProduct = _.find(products, function (product) {
                    return product.payload.slug === $state.params.productSlug;
                });
            }

            function _successVariantsCb(variants) {
                vm.variants = variants;

                if ($state.params.variantSlug) {
                    vm.currentVariant = _.find(variants, function (variant) {
                        return variant.payload.slug === $state.params.variantSlug;
                    });
                }
            }

            function _errorVariantsCb(err) {
                vm.error = err.message;
            }
        }]
    };
});