define([
    'angular',
    './master-controller'
],function (angular, masterController) {
    'use strict';

    var moduleName = 'southerncreations.core.controllers',
        module;

    module = angular.module(moduleName, [])
        .controller(masterController.name, masterController.fn);

    return {
        name: moduleName,
        module: module
    };
});