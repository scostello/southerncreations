define([
    'angular',
    './controllers/header-controller'
], function (angular, controller) {
    'use strict';

    var moduleName = 'southerncreations.header',
        module;

    module = angular.module(moduleName, [])
        .controller(controller.name, controller.fn);

    return {
        name: moduleName,
        module: module
    };
});