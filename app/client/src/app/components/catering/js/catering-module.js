define([
    'angular',
    './controllers/catering-controller'
], function (angular, cateringController) {
    'use strict';

    var moduleName = 'southerncreations.catering',
        module;

    module = angular.module(moduleName, [])
        .controller(cateringController.name, cateringController.fn);

    return {
        name: moduleName,
        module: module
    };
});