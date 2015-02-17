define([
    'angular',
    './controllers/about-controller'
], function (angular, controller) {
    'use strict';

    var moduleName = 'southerncreations.about',
        module;

    module = angular.module(moduleName, [])
        .controller(controller.name, controller.fn);

    return {
        name: moduleName,
        module: module
    };
});