define(function () {
    'use strict';

    return {
        name: 'CheckoutController',
        fn: [CheckoutController]
    };

    function CheckoutController() {
        var vm = this;
        vm.something = 'THIS IS IN CHECKOUT CONTROLLER';
    }
});