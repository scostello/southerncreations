define([
    'lodash'
],
function (_) {
    'use strict';

    return {
        name: 'ProductDetailController',
        fn: ['$stateParams', 'productDetails', ProductDetailController]
    };

    function ProductDetailController($stateParams, productDetails) {
        var vm = this;
        vm.product = getProduct();

        console.log(productDetails);

        function getProduct() {
            return {};
        }
    }
});