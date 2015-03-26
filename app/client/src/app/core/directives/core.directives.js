define([
    'angular',
    './windowClick-directive',
    './windowResize-directive',
    './fitvid-directive',
    './owlCarousel-directive'
], function (angular, windowClickDirective, windowResizeDirective, fitvidDirective, owlCarouselDirective) {
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
        .directive(windowClickDirective.name, windowClickDirective.fn)
        .directive(windowResizeDirective.name, windowResizeDirective.fn)
        .directive(fitvidDirective.name, fitvidDirective.fn)
        .directive(owlCarouselDirective.name, owlCarouselDirective.fn);

    return {
        name: moduleName,
        module: module
    };
});