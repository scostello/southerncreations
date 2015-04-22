define([
    'angular',
    './controllers/profile-controller',
    './controllers/profileUser-controller',
    './controllers/profileAccount-controller',
    './controllers/profileOrders-controller',
    'angularXeditable'
], function (angular, profileController, profileUserController, profileAccountController, profileOrdersController) {
    'use strict';

    var moduleName = 'southerncreations.profile',
        module;

    module = angular.module(moduleName, ['xeditable'])
        .run(['editableOptions', 'editableThemes', function (editableOptions, editableThemes) {
            editableThemes.bs3.buttonsClass = 'btn-sm btn-editable';
            editableOptions.theme = 'bs3';
        }])
        .controller(profileController.name, profileController.fn)
        .controller(profileUserController.name, profileUserController.fn)
        .controller(profileAccountController.name, profileAccountController.fn)
        .controller(profileOrdersController.name, profileOrdersController.fn);

    return {
        name: moduleName,
        module: module
    };
});