define([
    'angular',
    './services/core.services',
    './controllers/core.controllers',
    './directives/core.directives',
    'angularUiRouter',
    'ocLazyLoad',
    'angularJwt'
], function (angular, coreServices, coreControllers, coreDirectives) {
    'use strict';

    var moduleName = 'southerncreations.core',
        module;

    module = angular.module(moduleName, [
            'ui.router',
            'oc.lazyLoad',
            'angular-jwt',
            coreServices.name,
            coreControllers.name,
            coreDirectives.name
        ]
    )
    .config([
        '$locationProvider',
        '$urlRouterProvider',
        '$stateProvider',
        '$ocLazyLoadProvider',
        '$httpProvider',
        'jwtInterceptorProvider',
        function ($locationProvider, $urlRouterProvider, $stateProvider, $ocLazyLoadProvider, $httpProvider, jwtInterceptorProvider) {

            jwtInterceptorProvider.tokenGetter = ['AuthService', function (AuthService) {
                return AuthService.getAuthToken();
            }];

            $httpProvider.interceptors.push('jwtInterceptor');

            $ocLazyLoadProvider.config({
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
                            controller: 'HeaderController',
                            controllerAs: 'head'
                        },
                        'footer': {templateUrl: '/static/app/components/partials/views/footer.html'},
                        'side-menu': {
                            templateUrl: '/static/app/components/partials/views/side-menu.html'
                        }
                    },
                    resolve: {
                        partialModules: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'southerncreations.header',
                                    files: ['app/components/partials/js/header-module']
                                },
                                {
                                    name: 'southerncreations.footer',
                                    files: ['app/components/partials/js/footer-module']
                                }
                            ]);
                        }]
                    }
                })
                .state('app.home', {
                    url: '/',
                    views: {
                        'content@': {
                            templateUrl: '/static/app/components/home/views/home.html',
                            controller: 'HomeController',
                            controllerAs: 'home'
                        }
                    },
                    resolve: {
                        homeModule: ['$ocLazyLoad', function ($ocLazyLoad) {
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
                            controller: 'ProductsController',
                            controllerAs: 'prd'
                        }
                    },
                    resolve: {
                        productsModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'southerncreations.products',
                                files: ['app/components/products/js/products-module']
                            });
                        }],
                        products: ['ProductsService', function (ProductsService) {
                            return ProductsService.getProducts();
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
                        aboutModule: ['$ocLazyLoad', function ($ocLazyLoad) {
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
                        contactModule: ['$ocLazyLoad', function ($ocLazyLoad) {
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
                        loginModule: ['$ocLazyLoad', function ($ocLazyLoad) {
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
                            controller: 'SignupController',
                            controllerAs: 'signup'
                        }
                    },
                    resolve: {
                        signupModule: ['$ocLazyLoad', function ($ocLazyLoad) {
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
                        profileModule: ['$ocLazyLoad', function ($ocLazyLoad) {
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

            $locationProvider.html5Mode({enabled: true, requireBase: false});
        }]
    )
    .run([
        '$rootScope',
        '$state',
        'AuthService',
        function($rootScope, $state, AuthService) {
            $rootScope.$on('$stateChangeStart', function (evt, to) {
                if (to.data && to.data.requiresLogin) {
                    if (!AuthService.isLoggedIn()) {
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