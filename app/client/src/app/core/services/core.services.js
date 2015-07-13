define([
    'angular',
    './appState-service',
    './addresses-service',
    './settings-service',
    './products-service',
    './order-service',
    './pubsub-service',
    './user-service',
    './webapi-factory',
    'angularStorage',
    'angularCookies'
], function (angular, appStateService, addressesService, settingsService, productsService, orderService, pubsubService, userService, webApiFactory) {
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
        .service(settingsService.name, settingsService.fn)
        .service(productsService.name, productsService.fn)
        .service(pubsubService.name, pubsubService.fn);

    return {
        name: moduleName,
        module: module
    };
});