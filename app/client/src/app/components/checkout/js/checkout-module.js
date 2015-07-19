define([
    'angular',
    './services/checkout-service',
    './directives/payment-directive',
    './controllers/checkout-controller',
    'angularCreditCards'
], function (angular, checkoutService, paymentDirective, checkoutController) {
    'use strict';

    var moduleName = 'southerncreations.checkout',
        module;

    module = angular.module(moduleName, ['credit-cards'])
        .service(checkoutService.name, checkoutService.fn)
        .directive(paymentDirective.name, paymentDirective.fn)
        .controller(checkoutController.name, checkoutController.fn);

    return {
        name: moduleName,
        module: module
    };
});