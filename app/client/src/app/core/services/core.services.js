define([
    'angular',
    './settings-service',
    './products-service',
    './auth-service',
    './pubsub-service',
    'restangular',
    'angularStorage'
], function (angular, settingsService, productsService, authService, pubsubService) {
    'use strict';

    var moduleName = 'southerncreations.core.services',
        module;

    module = angular.module(moduleName, [
            'restangular',
            'LocalStorageModule'
        ])
        .constant('AUTH', {
            'JWT_KEY': 'jwt'
        })
        .constant('API', {
            'BASE': '/api',
            'BASE_LOGIN': 'login',
            'BASE_SIGNIN': 'signin',
            'BASE_PRODUCTS': 'products'
        })
        .config(['RestangularProvider', 'API', function (RestangularProvider, API) {
            RestangularProvider.setBaseUrl(API.BASE);
        }])
        .service(settingsService.name, settingsService.fn)
        .service(productsService.name, productsService.fn)
        .service(authService.name, authService.fn)
        .service(pubsubService.name, pubsubService.fn);

    return {
        name: moduleName,
        module: module
    };
});