(function (requirejs, require, global) {
    'use strict';

    var getTestFiles = function () {
        var allTestFiles = [];
        var TEST_REGEXP = /\.(spec|test)\.js$/i;

        var pathToModule = function(path) {
            return path.replace(/^\/base\/src\//, '').replace(/\.js$/, '');
        };

        Object.keys(global.__karma__.files).forEach(function(file) {
            if (TEST_REGEXP.test(file)) {
                // Normalize paths to RequireJS module names.
                allTestFiles.push(pathToModule(file));
            }
        });

        return allTestFiles;
    };

    require.config({

        baseUrl: window.__karma__ ? '/base/src' : '/static',

        deps: window.__karma__ ? getTestFiles() : [],

        callback: window.__karma__ ? window.__karma__.start : null,

        // Cache busting
        // Enable for production only
        urlArgs: '_=' + (new Date()).getTime(),

        paths: {

            domReady: 'vendor/requirejs-domready/domReady',

            jquery: 'vendor/jquery/dist/jquery.min',
            lodash: 'vendor/lodash/lodash.min',

            angular: 'vendor/angular/angular',
            angularResource: 'vendor/angular-sanitize/angular-sanitize.min',
            angularSanitize: 'vendor/angular-resource/angular-resource.min',
            angularUiRouter: 'vendor/angular-ui-router/release/angular-ui-router.min',
            angularCookies: 'vendor/angular-cookies/angular-cookies.min',
            angularStorage: 'vendor/angular-local-storage/dist/angular-local-storage.min',
            angularJwt: 'vendor/angular-jwt/dist/angular-jwt.min',
            angularMocks: 'vendor/angular-mocks/angular-mocks',
            ocLazyLoad: 'vendor/ocLazyLoad/dist/ocLazyLoad.require.min',
            angularBootstrap: 'vendor/angular-bootstrap/ui-bootstrap.min',
            angularXeditable: 'vendor/angular-xeditable/dist/js/xeditable.min',

            owl: 'vendor/owl-carousel/owl-carousel/owl.carousel.min',
            fitvid: 'vendor/fitvids/jquery.fitvids'
        },

        shim: {
            jquery: {
                exports: '$'
            },
            lodash: {
                exports: '_'
            },
            angular: {
                exports: 'angular'
            },
            angularResource: {
                deps: ['angular']
            },
            angularSanitize: {
                deps: ['angular']
            },
            angularUiRouter: {
                deps: ['angular']
            },
            angularCookies: {
                deps: ['angular']
            },
            angularStorage: {
                deps: ['angular']
            },
            angularJwt: {
                deps: ['angular']
            },
            angularMocks: {
                deps: ['angular'],
                exports: 'angular.mock'
            },
            ocLazyLoad: {
                deps: ['angular']
            },
            angularBootstrap: {
                deps: ['angular']
            },
            angularXeditable: {
                deps: ['angular']
            },
            owl: {
                deps: ['jquery']
            },
            fitvid: {
                deps: ['jquery']
            }
        }
    });

    require([
        'angular',
        'jquery',
        'app/app',
        'domReady'
    ], function (angular, $, app) {
        angular.bootstrap(document.getElementsByTagName('body')[0], [app.name]);

        // The following is required if you want AngularJS Scenario tests to work
        $('html').addClass('ng-app: ' + app.name);
    });

}(window.requirejs, window.require, window));