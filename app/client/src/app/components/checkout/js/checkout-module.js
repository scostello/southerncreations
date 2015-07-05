define([
    'angular',
    './controllers/checkout-controller',
    './controllers/register-controller'
], function (angular, checkoutController, registerConroller) {
    'use strict';

    var moduleName = 'southerncreations.checkout',
        module;

    module = angular.module(moduleName, [])
        .controller(checkoutController.name, checkoutController.fn)
        .controller(registerConroller.name, registerConroller.fn);

    return {
        name: moduleName,
        module: module
    };
});