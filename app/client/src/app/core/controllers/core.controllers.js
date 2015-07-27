define([
    'angular',
    './app-controller',
    './cart-controller',
    './calendarModal-controller'
],function (angular, appController, cartController, calendarModalController) {
    'use strict';

    var moduleName = 'southerncreations.core.controllers',
        module;

    module = angular.module(moduleName, [])
        .controller(appController.name, appController.fn)
        .controller(cartController.name, cartController.fn)
        .controller(calendarModalController.name, calendarModalController.fn);

    return {
        name: moduleName,
        module: module
    };
});