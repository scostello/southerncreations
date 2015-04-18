define([
    'angular',
    './controllers/adminDashboard-controller',
    './controllers/adminReporting-controller',
    './controllers/adminProducts-controller',
    './controllers/adminSchedule-controller',
    './controllers/adminUsers-controller'
], function (angular, adminDashboardController, adminReportingController, adminProductsController, adminScheduleController, adminUsersController) {
    'use strict';

    var moduleName = 'southerncreations.profile.admin',
        module;

    module = angular.module(moduleName, [])
        .controller(adminDashboardController.name, adminDashboardController.fn)
        .controller(adminReportingController.name, adminReportingController.fn)
        .controller(adminProductsController.name, adminProductsController.fn)
        .controller(adminScheduleController.name, adminScheduleController.fn)
        .controller(adminUsersController.name, adminUsersController.fn);

    return {
        name: moduleName,
        module: module
    };
});