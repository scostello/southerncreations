define([
    'angular',
    './services/checkout-service',
    './directives/payment-directive',
    './directives/deliveryMethod-directive',
    './controllers/checkout-controller',
    'angularCreditCards'
], function (angular, checkoutService, paymentDirective, deliveryMethodDirective, checkoutController) {
    'use strict';

    var moduleName = 'southerncreations.checkout',
        module;

    module = angular.module(moduleName, ['credit-cards'])
        .service(checkoutService.name, checkoutService.fn)
        .directive(paymentDirective.name, paymentDirective.fn)
        .directive(deliveryMethodDirective.name, deliveryMethodDirective.fn)
        .controller(checkoutController.name, checkoutController.fn);

    return {
        name: moduleName,
        module: module
    };
});