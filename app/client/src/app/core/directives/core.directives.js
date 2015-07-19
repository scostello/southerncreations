define([
    'angular',
    './fitvid-directive',
    './owlCarousel-directive'
], function (angular, fitvidDirective, owlCarouselDirective) {
    'use strict';

    var moduleName = 'southerncreations.core.directives',
        module;

    module = angular.module(moduleName, [])
        .directive(fitvidDirective.name, fitvidDirective.fn)
        .directive(owlCarouselDirective.name, owlCarouselDirective.fn);

    return {
        name: moduleName,
        module: module
    };
});