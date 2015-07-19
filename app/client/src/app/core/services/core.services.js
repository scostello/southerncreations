define([
    'angular',
    './appState-service',
    './addresses-service',
    './products-service',
    './order-service',
    './user-service',
    './webapi-factory',
    'angularStorage',
    'angularCookies'
], function (angular, appStateService, addressesService, productsService, orderService, userService, webApiFactory) {
    'use strict';

    var moduleName = 'southerncreations.core.services',
        module;

    module = angular.module(moduleName, [
            'LocalStorageModule',
            'ngCookies'
        ])
        .constant('STORAGE_KEYS', {})
        .constant('API', {
            'BASE': '/api',
            'BASE_LOGIN': 'login',
            'BASE_SIGNIN': 'signin',
            'BASE_CATEGORIES': 'categories',
            'BASE_PRODUCTS': 'products',
            'BASE_SETTINGS': 'settings',
            'BASE_USER': 'users'
        })
        .constant('EVENTS', {
            'CART_UPDATED': 'cart:updated',
            'CART_ITEM_ADDED': 'cart:itemAdded',
            'CART_ITEM_REMOVED': 'cart:itemRemoved'
        })
        .service(appStateService.name, appStateService.fn)
        .service(addressesService.name, addressesService.fn)
        .service(orderService.name, orderService.fn)
        .factory(webApiFactory.name, webApiFactory.fn)
        .service(userService.name, userService.fn)
        .service(productsService.name, productsService.fn);

    return {
        name: moduleName,
        module: module
    };
});