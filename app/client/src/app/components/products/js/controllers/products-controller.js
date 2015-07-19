define([
    'lodash'
], function (_) {
    'use strict';

    return {
        name: 'ProductsController',
        fn: ['$scope', '$state', 'products', 'ProductsService', 'OrderService', function ($scope, $state, products, ProductsService, OrderService) {
            var vm = this;
            vm.products = products;
            vm.variants = [];
            vm.currentProduct = null;
            vm.currentVariant = null;
            vm.variantOptions = [];
            vm.variantQty = 0;
            vm.addLineItem = _addLineItem;
            vm.showVariant = _showVariant;

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

                $scope.$watch(function () { return vm.currentVariant; }, function (currentVariant) {
                    var min, max, inc;

                    if (currentVariant) {
                        min = inc = vm.currentProduct.payload.options.quantityInc;
                        max = vm.currentProduct.payload.options.quantityMax + 1;

                        vm.variantOptions = _.range(min, max, inc).map(function (increment) {
                            return {
                                value: increment,
                                name: currentVariant.payload.name + ' (' + increment + 'ct)'
                            };
                        });

                        vm.variantQty = min;
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

            function _showVariant(variant) {
                vm.currentVariant = variant;
                $state.go('app.menu.product.variant', {variantSlug: variant.payload.slug});
            }
        }]
    };
});