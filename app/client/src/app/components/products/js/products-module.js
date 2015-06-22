define([
    'angular',
    './controllers/products-controller',
    './controllers/productVariants-controller',
    './controllers/productDetail-controller',
    './directives/menuProducts-directive'
], function (angular, productsController, productVariantsController, productDetailController, menuProductsDirective) {
    'use strict';

    var moduleName = 'southerncreations.products',
        module;

    module = angular.module(moduleName, [])
        .controller(productsController.name, productsController.fn)
        .controller(productVariantsController.name, productVariantsController.fn)
        .controller(productDetailController.name, productDetailController.fn)
        .directive(menuProductsDirective.name, menuProductsDirective.fn);

    return {
        name: moduleName,
        module: module
    };
});