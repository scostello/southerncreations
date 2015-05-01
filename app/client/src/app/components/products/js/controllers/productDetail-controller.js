define([
    'lodash'
],
function (_) {
    'use strict';

    return {
        name: 'ProductDetailController',
        fn: ['$stateParams', 'menu', ProductDetailController]
    };

    function ProductDetailController($stateParams, menu) {
        var vm = this;

        vm.product = getProduct();

        function getProduct() {
            var requestedProduct =  _.where(menu.products, {slug: $stateParams.slug});
            return requestedProduct[0];
        }
    }
});