define([
    'angular',
    'lodash',
    './services/core.services',
    './controllers/core.controllers',
    './directives/core.directives',
    './filters/core.filters',
    'angularUiRouter',
    'ocLazyLoad',
    'angularJwt',
    'angularBootstrap',
    'angularXeditable'
], function (angular, _, coreServices, coreControllers, coreDirectives, coreFilters) {
    'use strict';

    var moduleName = 'southerncreations.core',
        module;

    module = angular.module(moduleName, [
            'ui.router',
            'oc.lazyLoad',
            'angular-jwt',
            'ui.bootstrap',
            'xeditable',
            coreServices.name,
            coreControllers.name,
            coreDirectives.name,
            coreFilters.name
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

            /*jwtInterceptorProvider.tokenGetter = ['UserService', function (UserService) {
                return UserService.getAuthToken();
            }];

            $httpProvider.interceptors.push('jwtInterceptor');
            */
            $ocLazyLoadProvider.config({
                jsLoader: requirejs
            });

            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('app', {
                    url: '',
                    templateUrl: '/static/views/layouts/app.html',
                    controller: 'AppController',
                    controllerAs: 'appCtrl',
                    resolve: {
                        root: ['$q', 'WebApi', function ($q, WebApi) {
                            var dfd = $q.defer();

                            WebApi.app.getRoot()
                                .then(function (root) {
                                    WebApi.root = root;
                                    dfd.resolve(root);
                                });

                            return dfd.promise;
                        }],
                        settings: ['root', function (root) {
                            return root.payload.settings;
                        }],
                        shoppingCart: ['root', 'settings', 'ShoppingCartService', function (root, settings, ShoppingCartService) {
                            ShoppingCartService.setOrderCookieKeys(settings.cookieKeys);
                            return ShoppingCartService.restore(root);
                        }]
                    }
                })
                .state('app.home', {
                    url: '/',
                    views: {
                        'content@app': {
                            templateUrl: '/static/app/components/home/views/home.html',
                            controller: 'HomeController',
                            controllerAs: 'homeCtrl'
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
                .state('app.menu', {
                    url: '/menu',
                    views: {
                        'content@app': {
                            templateUrl: '/static/app/components/products/views/index.html',
                            controller: 'ProductsController',
                            controllerAs: 'prdCtrl'
                        },
                        'product@app.menu': {
                            templateUrl: '/static/app/components/products/views/menu-description.html'
                        }
                    },
                    resolve: {
                        productsModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'southerncreations.products',
                                files: ['app/components/products/js/products-module']
                            });
                        }],
                        products: ['root', 'WebApi', function (root, WebApi) {
                            return WebApi.products.getAll(root.links);
                        }]
                    }
                })
                .state('app.menu.product', {
                    url: '/:productSlug',
                    views: {
                        'product@app.menu': {
                            templateUrl: '/static/app/components/products/views/product.html'
                        }
                    }
                })
                .state('app.menu.product.variant', {
                    url: '/:variantSlug',
                    views: {
                        'product@app.menu': {
                            templateUrl: '/static/app/components/products/views/product-variant.html',
                            controller: 'ProductsController',
                            controllerAs: 'prdCtrl'
                        }
                    }
                })
                .state('app.catering', {
                    url: '/catering',
                    views: {
                        'content@app': {
                            templateUrl: '/static/app/components/catering/views/catering.html',
                            controller: 'CateringController',
                            controllerAs: 'cateringCtrl'
                        }
                    },
                    resolve: {
                        cateringModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'southerncreations.catering',
                                files: ['app/components/catering/js/catering-module']
                            });
                        }]
                    }
                })
                .state('app.about', {
                    url: '/about',
                    views: {
                        'content@app': {
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
                        'content@app': {
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
                .state('app.cart', {
                    url: '/cart',
                    views: {
                        'content@app': {
                            templateUrl: '/static/app/components/cart/views/cart.html',
                            controller: 'CartController',
                            controllerAs: 'cartCtrl'
                        }
                    },
                    resolve: {
                        cartModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'southerncreations.cart',
                                files: ['app/components/cart/js/cart-module']
                            });
                        }]
                    }
                })
                .state('app.login', {
                    url: '/login',
                    views: {
                        'content@app': {
                            templateUrl: '/static/app/components/login/views/login.html',
                            controller: 'LoginController',
                            controllerAs: 'loginCtrl'
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
                .state('app.signup', {
                    url: '/signup',
                    views: {
                        'content@app': {
                            templateUrl: '/static/app/components/signup/views/signup.html',
                            controller: 'SignupController',
                            controllerAs: 'signupCtrl'
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
                .state('app.profile', {
                    url: '/profile',
                    abstract: true,
                    views: {
                        'content@app': {
                            templateUrl: '/static/app/components/profile/views/profile.html',
                            controller: 'ProfileController',
                            controllerAs: 'profile'
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
                })
                .state('app.profile.user', {
                    url: '',
                    views: {
                        'content@app.profile': {
                            templateUrl: '/static/app/components/profile/views/profile-user.html',
                            controller: 'ProfileUserController',
                            controllerAs: 'profileUser'
                        }
                    }
                })
                .state('app.profile.account', {
                    url: '/account',
                    views: {
                        'content@app.profile': {
                            templateUrl: '/static/app/components/profile/views/profile-account.html',
                            controller: 'ProfileAccountController',
                            controllerAs: 'profileAccount'
                        }
                    }
                })
                .state('app.profile.orders', {
                    url: '/orders',
                    views: {
                        'content@app.profile': {
                            templateUrl: '/static/app/components/profile/views/profile-orders.html',
                            controller: 'ProfileOrdersController',
                            controllerAs: 'profileOrders'
                        }
                    }
                })
                .state('app.profile.admin', {
                    url: '',
                    abstract: true,
                    resolve: {
                        adminModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'southerncreations.profile.admin',
                                files: ['app/components/profile/js/admin-module']
                            });
                        }]
                    },
                    data: {
                        requiresLogin: true,
                        requiresAdminRights: true
                    }
                })
                .state('app.profile.admin.dashboard', {
                    url: '/dashboard',
                    views: {
                        'content@app.profile': {
                            templateUrl: '/static/app/components/profile/views/admin-dashboard.html',
                            controller: 'AdminDashboardController',
                            controllerAs: 'admin'
                        }
                    }
                })
                .state('app.profile.admin.reporting', {
                    url: '/reporting',
                    views: {
                        'content@app.profile': {
                            templateUrl: '/static/app/components/profile/views/admin-reporting.html',
                            controller: 'AdminReportingController',
                            controllerAs: 'adminReporting'
                        }
                    }
                })
                .state('app.profile.admin.products', {
                    url: '/products',
                    views: {
                        'content@app.profile': {
                            templateUrl: '/static/app/components/profile/views/admin-products.html',
                            controller: 'AdminProductsController',
                            controllerAs: 'adminProduct'
                        }
                    }
                })
                .state('app.profile.admin.schedule', {
                    url: '/schedule',
                    views: {
                        'content@app.profile': {
                            templateUrl: '/static/app/components/profile/views/admin-schedule.html',
                            controller: 'AdminScheduleController',
                            controllerAs: 'adminSchedule'
                        }
                    }
                })
                .state('app.profile.admin.users', {
                    url: '/users',
                    views: {
                        'content@app.profile': {
                            templateUrl: '/static/app/components/profile/views/admin-users.html',
                            controller: 'AdminUsersController',
                            controllerAs: 'adminUsers'
                        }
                    }
                })
                .state('app.cart.checkout', {
                    url: '/checkout',
                    views: {
                        'content@app': {
                            templateUrl: '/static/app/components/cart/views/checkout.html',
                            controller: 'CartController',
                            controllerAs: 'cartCtrl'
                        }
                    }
                });

            $locationProvider.html5Mode({enabled: true, requireBase: false});
        }]
    )
    .run([
        '$rootScope',
        '$state',
        'UserService',
        'editableOptions',
        'editableThemes',
        function($rootScope, $state, UserService, editableOptions, editableThemes) {
            editableThemes.bs3.buttonsClass = 'btn-sm btn-editable';
            editableOptions.theme = 'bs3';

            $rootScope.$on('$stateChangeStart', function (evt, to) {
                if (to.data && to.data.requiresLogin) {
                    if (!UserService.isLoggedIn()) {
                        evt.preventDefault();
                        $state.go('app.login');
                    }
                }

                if (to.data && to.data.requiresAdminRights) {
                    if (!UserService.isAdmin()) {
                        evt.preventDefault();
                        $state.go('app.profile');
                    }
                }
            });
        }]);

    return {
        name: moduleName,
        module: module
    };
});