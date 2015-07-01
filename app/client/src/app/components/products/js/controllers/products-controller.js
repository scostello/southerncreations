define([
    'lodash'
], function (_) {
    'use strict';

    return {
        name: 'ProductsController',
        fn: ['$scope', '$state', 'products', 'ProductsService', 'OrderService', function ($scope, $state, products, ProductsService, OrderService) {
            var vm = this;
            vm.products = products;
            vm.currentProduct = null;
            vm.variants = [];
            vm.currentVariant = null;
            vm.variantFormOpts = {
                quantity: _.range(6, 49, 6)
            };
            vm.addLineItem = _addLineItem;

            activate();

            function activate() {
                if ($state.params.productSlug) {
                    vm.currentProduct = _.find(products, function (product) {
                        return product.payload.slug === $state.params.productSlug;
                    });
                }

                $scope.$watch(function () { return vm.currentProduct; }, function (currentProduct) {
                    if (currentProduct) {
                        ProductsService.getVariants(currentProduct)
                            .then(function (variants) {
                                vm.variants = variants;

                                if ($state.params.variantSlug) {
                                    vm.currentVariant = _.find(variants, function (variant) {
                                        return variant.payload.slug === $state.params.variantSlug;
                                    });
                                }
                            }, function (err) {
                                vm.error = err.message;
                            });
                    }
                });
            }

            function _addLineItem(quantity) {
                OrderService.addLineItem(vm.currentVariant, quantity)
                    .then(function (order) {

                    }, function (err) {
                        vm.error = err.message;
                    });
            }
        }]
    };
});