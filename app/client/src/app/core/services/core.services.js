define([
    'angular',
    './settings-service',
    './products-service',
    './cart-service',
    './cartItem-factory',
    './pubsub-service',
    './user-service',
    'angularStorage',
    'angularCookies'
], function (angular, settingsService, productsService, cartService, cartItemFactory, pubsubService, userService) {
    'use strict';

    var moduleName = 'southerncreations.core.services',
        module;

    module = angular.module(moduleName, [
            'LocalStorageModule',
            'ngCookies'
        ])
        .constant('STORAGE_KEYS', {
            'JWT': 'jwt',
            'SETTINGS': 'settings',
            'SESSION': 'session'
        })
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
        .service(cartService.name, cartService.fn)
        .factory(cartItemFactory.name, cartItemFactory.fn)
        .service(userService.name, userService.fn)
        .service(settingsService.name, settingsService.fn)
        .service(productsService.name, productsService.fn)
        .service(pubsubService.name, pubsubService.fn)
        .run(['$rootScope', '$cookies', 'ShoppingCartService', 'EVENTS', function ($rootScope, $cookies, ShoppingCartService, EVENTS) {

            $rootScope.$on(EVENTS.CART_UPDATED, function () {
                ShoppingCartService.save();
            });

            ShoppingCartService.init();
            console.log($cookies.getAll());
        }]);

    return {
        name: moduleName,
        module: module
    };
});