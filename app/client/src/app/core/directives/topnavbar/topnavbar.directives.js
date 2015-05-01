define([
    'angular',
    './utilityCart-directive'
], function (angular, utilityCartDirective) {
    'use strict';

    var moduleName = 'southerncreations.directives.topnavbar',
        module;

    module = angular.module(moduleName, [])
        .directive(utilityCartDirective.name, utilityCartDirective.fn);

    return {
        name: moduleName,
        module: module
    };
});