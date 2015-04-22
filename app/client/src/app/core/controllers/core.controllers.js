define([
    'angular',
    './app-controller'
],function (angular, appController) {
    'use strict';

    var moduleName = 'southerncreations.core.controllers',
        module;

    module = angular.module(moduleName, [])
        .controller(appController.name, appController.fn);

    return {
        name: moduleName,
        module: module
    };
});