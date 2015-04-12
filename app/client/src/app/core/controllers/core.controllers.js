define([
    'angular',
    './app-controller',
    './auth-controller'
],function (angular, appController, authController) {
    'use strict';

    var moduleName = 'southerncreations.core.controllers',
        module;

    module = angular.module(moduleName, [])
        .controller(appController.name, appController.fn)
        .controller(authController.name, authController.fn);

    return {
        name: moduleName,
        module: module
    };
});