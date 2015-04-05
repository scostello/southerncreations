define([
    'angular',
    './controllers/profile-controller',
    './controllers/admin-controller',
    './directives/adminProducts-directive'
], function (angular, profileController, adminController, adminProductsDirective) {
    'use strict';

    var moduleName = 'southerncreations.profile',
        module;

    module = angular.module(moduleName, [])
        .controller(profileController.name, profileController.fn)
        .controller(adminController.name, adminController.fn)
        .directive(adminProductsDirective.name, adminProductsDirective.fn);

    return {
        name: moduleName,
        module: module
    };
});