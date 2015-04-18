define([
    'angular',
    './controllers/profile-controller',
    './controllers/profileUser-controller',
    './controllers/profileAccount-controller',
    './controllers/profileOrders-controller'
], function (angular, profileController, profileUserController, profileAccountController, profileOrdersController) {
    'use strict';

    var moduleName = 'southerncreations.profile',
        module;

    module = angular.module(moduleName, [])
        .controller(profileController.name, profileController.fn)
        .controller(profileUserController.name, profileUserController.fn)
        .controller(profileAccountController.name, profileAccountController.fn)
        .controller(profileOrdersController.name, profileOrdersController.fn);

    return {
        name: moduleName,
        module: module
    };
});