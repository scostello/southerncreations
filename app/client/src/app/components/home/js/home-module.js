define([
    'angular',
    './controllers/home-controller'
], function (angular, controller) {
    'use strict';

    var moduleName = 'southerncreations.home',
        module;

    module = angular.module(moduleName, [])
        .controller(controller.name, controller.fn);

    return {
        name: moduleName,
        module: module
    };
});