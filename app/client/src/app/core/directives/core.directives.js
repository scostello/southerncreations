define([
    'angular',
    './windowOverlay-directive',
    './windowResize-directive',
    './fitvid-directive',
    './owlCarousel-directive',
    './toggleState-directive'
], function (angular, windowOverlay, windowResizeDirective, fitvidDirective, owlCarouselDirective, toggleStateDirective) {
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
        .directive(windowOverlay.name, windowOverlay.fn)
        .directive(windowResizeDirective.name, windowResizeDirective.fn)
        .directive(fitvidDirective.name, fitvidDirective.fn)
        .directive(owlCarouselDirective.name, owlCarouselDirective.fn)
        .directive(toggleStateDirective.name, toggleStateDirective.fn);

    return {
        name: moduleName,
        module: module
    };
});