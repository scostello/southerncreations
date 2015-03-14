define([
    'angular',
    './globalClick-directive',
    './windowResize-directive'
], function (angular, globalClickDirective, windowResizeDirective) {
    'use strict';

    var moduleName = 'southerncreations.core.directives',
        module;

    module = angular.module(moduleName, [])
        .constant('RESOLUTIONS', {
            PHONE: 480,
            TABLET: 768,
            DESKTOP: 992,
            DESKTOP_LG: 1200
        })
        .directive(globalClickDirective.name, globalClickDirective.fn)
        .directive(windowResizeDirective.name, windowResizeDirective.fn);

    return {
        name: moduleName,
        module: module
    };
});