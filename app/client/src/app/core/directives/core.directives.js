define([
    'angular',
    './global/global.directives',
    './topnavbar/topnavbar.directives'
], function (angular, globalDirectivesModule, navbarDirectivesModule) {
    'use strict';

    var moduleName = 'southerncreations.core.directives',
        module;

    module = angular.module(moduleName, [
            globalDirectivesModule.name,
            navbarDirectivesModule.name
        ]);

    return {
        name: moduleName,
        module: module
    };
});