define([
    'angular',
    './controllers/signup-controller'
], function (angular, controller) {
    'use strict';

    var moduleName = 'southerncreations.signup',
        module;

    module = angular.module(moduleName, [])
        .controller(controller.name, controller.fn);

    return {
        name: moduleName,
        module: module
    };
});