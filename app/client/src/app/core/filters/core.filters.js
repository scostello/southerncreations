/**
 * Created by scostello on 3/19/15.
 */
define([
    'angular',
    './join-filter'
], function (angular, joinFilter) {
    'use strict';

    var moduleName = 'southerncreations.core.filters',
        module;


    module = angular.module(moduleName, [])
        .filter(joinFilter.name, joinFilter.fn);

    return {
        name: moduleName,
        module: module
    };
});