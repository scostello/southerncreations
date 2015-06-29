define(function () {
    'use strict';

    return {
        name: 'CartController',
        fn: ['lineItems', CartController]
    };

    function CartController(lineItems) {
        var vm = this;
        vm.lineItems = lineItems;
    }
});