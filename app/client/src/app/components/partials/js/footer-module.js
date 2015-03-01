define([
    'angular',
    './controllers/footer-controller'
], function (angular, controller) {
    'use strict';

    var moduleName = 'southerncreations.footer',
        module;

    module = angular.module(moduleName, [])
        .controller(controller.name, controller.fn);

    return {
        name: moduleName,
        module: module
    };
});
