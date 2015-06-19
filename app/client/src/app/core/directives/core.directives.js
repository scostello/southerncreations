define([
    'angular',
    './fitvid-directive',
    './owlCarousel-directive',
    './toggleState-directive'
], function (angular, fitvidDirective, owlCarouselDirective, toggleStateDirective) {
    'use strict';

    var moduleName = 'southerncreations.core.directives',
        module;

    module = angular.module(moduleName, [])
        .directive(fitvidDirective.name, fitvidDirective.fn)
        .directive(owlCarouselDirective.name, owlCarouselDirective.fn)
        .directive(toggleStateDirective.name, toggleStateDirective.fn);

    return {
        name: moduleName,
        module: module
    };
});