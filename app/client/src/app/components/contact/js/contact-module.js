define([
    '../../../../../.bower-cache/24cd0aa8295891c84edc135537fcaa27/0.5.2/examples/requireJSExample/js/angular.min',
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