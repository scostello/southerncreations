define([
    'angular',
    './globalClick-directive'
], function (angular, globalClickDirective) {
    'use strict';

    var moduleName = 'southerncreations.core.directives',
        module;

    module = angular.module(moduleName, [])
        .directive(globalClickDirective.name, globalClickDirective.fn);

    return {
        name: moduleName,
        module: module
    };
});