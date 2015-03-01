define([
    'angular',
    './controllers/login-controller'
], function (angular, controller) {
    'use strict';

    var moduleName = 'southerncreations.login',
        module;

    module = angular.module(moduleName, [])
        .config(['RestangularProvider', function (RestangularProvider) {
            RestangularProvider.setBaseUrl('/api');
        }])
        .controller(controller.name, controller.fn);

    return {
        name: moduleName,
        module: module
    };
});