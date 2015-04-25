define([
    'lodash'
],
function (_) {
    'use strict';

    return {
        name: 'ProductDetailController',
        fn: ['$stateParams', 'products', ProductDetailController]
    };

    function ProductDetailController($stateParams, products) {
        var vm = this;

        vm.product = getProduct();

        function getProduct() {
            var requestedProduct =  _.where(products, {slug: $stateParams.slug});
            return requestedProduct[0];
        }
    }
});