define([
    'angular',
    './controllers/products-controller'
], function (angular, productsController) {
    'use strict';

    var moduleName = 'southerncreations.products',
        module;

    module = angular.module(moduleName, [])
        .controller(productsController.name, productsController.fn);

    return {
        name: moduleName,
        module: module
    };
});