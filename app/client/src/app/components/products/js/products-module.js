define([
    'angular',
    './controllers/products-controller',
    './directives/menuProducts-directive',
    './directives/productVariants-directive'
], function (angular, productsController, menuProductsDirective, productVariantsDirective) {
    'use strict';

    var moduleName = 'southerncreations.products',
        module;

    module = angular.module(moduleName, [])
        .controller(productsController.name, productsController.fn)
        .directive(menuProductsDirective.name, menuProductsDirective.fn)
        .directive(productVariantsDirective.name, productVariantsDirective.fn);

    return {
        name: moduleName,
        module: module
    };
});