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
            // Require.js Plugins
            domReady: 'vendor/requirejs-domready/domReady',

            // Utility Libs
            jquery: 'vendor/jquery/dist/jquery.min',
            lodash: 'vendor/lodash/lodash.min',
            moment: 'vendor/moment/min/moment.min',

            // Angular Libs
            angular: 'vendor/angular/angular',
            angularAnimate: 'vendor/angular-animate/angular-animate.min',
            angularBootstrap: 'vendor/angular-bootstrap/ui-bootstrap-tpls',
            angularCookies: 'vendor/angular-cookies/angular-cookies.min',
            angularCreditCards: 'vendor/angular-credit-cards/release/angular-credit-cards',
            angularJwt: 'vendor/angular-jwt/dist/angular-jwt.min',
            angularMessages: 'vendor/angular-messages/angular-messages.min',
            angularMocks: 'vendor/angular-mocks/angular-mocks',
            angularStorage: 'vendor/angular-local-storage/dist/angular-local-storage.min',
            angularUiCalendar: 'vendor/angular-ui-calendar/src/calendar',
            angularUiMask: 'vendor/angular-ui-mask/dist/mask.min',
            angularUiRouter: 'vendor/angular-ui-router/release/angular-ui-router.min',
            angularXeditable: 'vendor/angular-xeditable/dist/js/xeditable.min',
            ocLazyLoad: 'vendor/ocLazyLoad/dist/ocLazyLoad.require.min',

            // JQuery Plugins
            owl: 'vendor/owl-carousel/owl-carousel/owl.carousel.min',
            fitvid: 'vendor/fitvids/jquery.fitvids',

            // Payment Libs
            braintree: 'vendor/braintree-web/dist/braintree',

            // Calendar Libs
            fullcalendar: 'vendor/fullcalendar/dist/fullcalendar.min',
            gcal: 'vendor/fullcalendar/dist/gcal'
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
            angularAnimate: {
                deps: ['angular']
            },
            angularBootstrap: {
                deps: ['angular']
            },
            angularCookies: {
                deps: ['angular']
            },
            angularCreditCards: {
                deps: ['angular']
            },
            angularJwt: {
                deps: ['angular']
            },
            angularMessages: {
                deps: ['angular']
            },
            angularMocks: {
                deps: ['angular'],
                exports: 'angular.mock'
            },
            angularStorage: {
                deps: ['angular']
            },
            angularUiCalendar: {
                deps: ['angular']
            },
            angularUiMask: {
                deps: ['angular']
            },
            angularUiRouter: {
                deps: ['angular']
            },
            angularXeditable: {
                deps: ['angular']
            },
            ocLazyLoad: {
                deps: ['angular']
            },
            owl: {
                deps: ['jquery']
            },
            fitvid: {
                deps: ['jquery']
            },
            braintree: {
                exports: 'braintree'
            },
            fullcalendar: {
                deps: [
                    'jquery',
                    'moment',
                    'angularUiCalendar'
                ]
            },
            gcal: {
                deps: [
                    'fullcalendar'
                ]
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