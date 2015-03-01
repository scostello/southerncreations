define([
    'angular',
    './controllers/profile-controller'
], function (angular, profileController) {
    'use strict';

    var moduleName = 'southerncreations.profile',
        module;

    module = angular.module(moduleName, [])
        .config(['RestangularProvider', function (RestangularProvider) {
            RestangularProvider.setBaseUrl('/api');
        }])
        .controller(profileController.name, profileController.fn);

    return {
        name: moduleName,
        module: module
    };
});