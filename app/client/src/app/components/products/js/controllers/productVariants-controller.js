define(function () {
    'use strict';

    return {
        name: 'ProductVariantsController',
        fn: ['currentProduct', ProductVariantsController]
    };

    function ProductVariantsController(currentProduct) {
        var vm = this;
        vm.currentProduct = currentProduct;
    }
});