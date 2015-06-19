define([
   'angular',
    './controllers/cart-controller'
], function (angular, cartController) {
    'use strict';

    var moduleName = 'southerncreations.cart',
        module;

    module = angular.module(moduleName, [])
        .controller(cartController.name, cartController.fn);

    return {
        name: moduleName,
        module: module
    };
});