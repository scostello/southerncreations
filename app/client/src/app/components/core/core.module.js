define([
    'angular',
    'angularUiRouter',
    'ocLazyLoad',
    'restangular',
    'angularStorage',
    'angularJwt'
], function (angular) {
    'use strict';

    var moduleName = 'southerncreations.core',
        module;

    module = angular.module(moduleName, [
            'ui.router',
            'oc.lazyLoad',
            'restangular',
            'LocalStorageModule',
            'angular-jwt'
        ])
        .config([
            '$locationProvider',
            '$urlRouterProvider',
            '$stateProvider',
            '$ocLazyLoadProvider',
            '$httpProvider',
            'jwtInterceptorProvider',
            function ($locationProvider, $urlRouterProvider, $stateProvider, $ocLazyLoadProvider, $httpProvider, jwtInterceptorProvider) {

                jwtInterceptorProvider.tokenGetter = ['localStorageService', function (localStorageService) {
                    return localStorageService.get('jwt');
                }];

                $httpProvider.interceptors.push('jwtInterceptor');

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
                            'header': {
                                templateUrl: '/static/app/components/partials/views/header.html',
                                controller: 'HeaderController'
                            },
                            'footer': {templateUrl: '/static/app/components/partials/views/footer.html'}
                        },
                        resolve: {
                            loadHeaderController: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    {
                                        name: 'southerncreations.header',
                                        files: ['app/components/partials/js/header-module']
                                    },
                                    {
                                        name: 'southerncreations.footer',
                                        files: ['app/components/partials/js/footer-module']
                                    }
                                ])
                            }]
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
                    })
                    .state('auth', {
                        url: '',
                        abstract: true
                    })
                    .state('auth.login', {
                        url: '/login',
                        views: {
                            'content@': {
                                templateUrl: '/static/app/components/login/views/login.html',
                                controller: 'LoginController'
                            }
                        },
                        resolve: {
                            loadModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    name: 'southerncreations.login',
                                    files: ['app/components/login/js/login-module']
                                });
                            }]
                        }
                    })
                    .state('auth.signup', {
                        url: '/signup',
                        views: {
                            'content@': {
                                templateUrl: '/static/app/components/signup/views/signup.html',
                                controller: 'SignupController'
                            }
                        },
                        resolve: {
                            loadModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    name: 'southerncreations.signup',
                                    files: ['app/components/signup/js/signup-module']
                                });
                            }]
                        }
                    })
                    .state('auth.profile', {
                        url: '/profile',
                        views: {
                            'content@': {
                                templateUrl: '/static/app/components/profile/views/profile.html',
                                controller: 'ProfileController'
                            }
                        },
                        resolve: {
                            loadModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    name: 'southerncreations.profile',
                                    files: ['app/components/profile/js/profile-module']
                                });
                            }]
                        },
                        data: {
                            requiresLogin: true
                        }
                    });

                $locationProvider.html5Mode(true);
            }]
        )
        .run(['$rootScope', '$state', 'localStorageService', 'jwtHelper', function($rootScope, $state, localStorageService, jwtHelper) {
            $rootScope.$on('$stateChangeStart', function (evt, to) {
                if (to.data && to.data.requiresLogin) {
                    if (!localStorageService.get('jwt') || jwtHelper.isTokenExpired(localStorageService.get('jwt'))) {
                        evt.preventDefault();
                        $state.go('auth.login');
                    }
                }
            });
        }]);

    return {
        name: moduleName,
        module: module
    };
});