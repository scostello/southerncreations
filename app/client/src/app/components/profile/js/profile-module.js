define([
    'angular',
    './controllers/profile-controller'
], function (angular, profileController) {
    'use strict';

    var moduleName = 'southerncreations.profile',
        module;

    module = angular.module(moduleName, [])
        .controller(profileController.name, profileController.fn);

    return {
        name: moduleName,
        module: module
    };
});