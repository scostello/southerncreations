define([
    'angular',
    'angularUiRouter',
    'ocLazyLoad'
], function (angular) {
    'use strict';

    var moduleName = 'southerncreations.core',
        module;

    module = angular.module(moduleName, [
            'ui.router',
            'oc.lazyLoad'
        ])
        .config([
            '$urlRouterProvider',
            '$stateProvider',
            '$ocLazyLoadProvider',
            function ($urlRouterProvider, $stateProvider, $ocLazyLoadProvider) {

                $ocLazyLoadProvider.config({
                    debug: true,
                    jsLoader: requirejs
                });

                $urlRouterProvider.otherwise('/');

                $stateProvider
                    .state('app', {
                        url: '',
                        abstract: true,
                        views: {
                            'header': {templateUrl: '/static/app/components/partials/header/views/header.html'},
                            'footer': {templateUrl: '/static/app/components/partials/footer/views/footer.html'}
                        }
                    })
                    .state('app.home', {
                        url: '/',
                        views: {
                            'content@': {
                                templateUrl: '/static/app/components/home/views/home.html',
                                controller: 'HomeController'
                            }
                        },
                        resolve: {
                            loadModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    name: 'southerncreations.home',
                                    files: ['app/components/home/js/home-module']
                                });
                            }]
                        }
                    })
                    .state('app.products', {
                        url: '/products',
                        views: {
                            'content@': {
                                templateUrl: '/static/app/components/products/views/products.html',
                                controller: 'ProductsController'
                            }
                        },
                        resolve: {
                            loadModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    name: 'southerncreations.products',
                                    files: ['app/components/products/js/products-module']
                                });
                            }]
                        }
                    })
                    .state('app.about', {
                        url: '/about',
                        views: {
                            'content@': {
                                templateUrl: '/static/app/components/about/views/about.html',
                                controller: 'AboutController'
                            }
                        },
                        resolve: {
                            loadModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    name: 'southerncreations.about',
                                    files: ['app/components/about/js/about-module']
                                });
                            }]
                        }
                    })
                    .state('app.contact', {
                        url: '/contact',
                        views: {
                            'content@': {
                                templateUrl: '/static/app/components/contact/views/contact.html',
                                controller: 'ContactController'
                            }
                        },
                        resolve: {
                            loadModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    name: 'southerncreations.contact',
                                    files: ['app/components/contact/js/contact-module']
                                });
                            }]
                        }
                    });
            }]);

    return {
        name: moduleName,
        module: module
    };
});