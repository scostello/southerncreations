define([
    'angular',
    './app-controller',
    './cart-controller'
],function (angular, appController, cartController) {
    'use strict';

    var moduleName = 'southerncreations.core.controllers',
        module;

    module = angular.module(moduleName, [])
        .controller(appController.name, appController.fn)
        .controller(cartController.name, cartController.fn);

    return {
        name: moduleName,
        module: module
    };
});