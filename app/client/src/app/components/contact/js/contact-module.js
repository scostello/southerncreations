define([
    'angular',
    './controllers/contact-controller'
], function (angular, contactController) {
    'use strict';

    var moduleName = 'southerncreations.contact',
        module;

    module = angular.module(moduleName, [])
        .controller(contactController.name, contactController.fn);

    return {
        name: moduleName,
        module: module
    };
});