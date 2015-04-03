define([
    'angular',
    './controllers/profile-controller',
    './controllers/admin-controller'
], function (angular, profileController, adminController) {
    'use strict';

    var moduleName = 'southerncreations.profile',
        module;

    module = angular.module(moduleName, [])
        .controller(profileController.name, profileController.fn)
        .controller(adminController.name, adminController.fn);

    return {
        name: moduleName,
        module: module
    };
});