(function () {
    'use strict';

    angular.module('southerncreations')
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('root', {
                    url: '',
                    abstract: true,
                    views: {
                        'header': {templateUrl: '/static/app/components/core/header/views/header.html'},
                        'footer': {templateUrl: '/static/app/components/core/footer/views/footer.html'}
                    }
                })
                .state('root.home', {
                    url: '/',
                    views: {
                        'container@': {
                            templateUrl: '/static/app/components/home/views/home.html'
                        }
                    }
                })
                .state('root.about', {
                    url: '/about',
                    views: {
                        'container@': {
                            templateUrl: '/static/app/components/about/views/about.html'
                        }
                    }
                });
        }]);

}());