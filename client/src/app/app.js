define([
    'angular',
    'app/components/core/core.module'
], function (angular, coreModule) {
    'use strict';

    var moduleName = 'southerncreations',
        module;

    module = angular.module(moduleName, [coreModule.name]);

    return {
        name: moduleName,
        module: module
    };
});