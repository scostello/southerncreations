'use strict';

require.config({

    baseUrl: '/static',

    deps: ['app/app.boot'],

    // Cache busting
    // Enable for production only
    urlArgs: '_=' + (new Date()).getTime(),

    paths: {
        domReady: '/static/requirejs-domready/domReady',

        jquery: 'jquery/dist/jquery.min',
        lodash: 'lodash/dist/lodash.min',

        angular: 'angular/angular',
        angularResource: 'angular-sanitize/angular-sanitize.min',
        angularSanitize: 'angular-resource/angular-resource.min',
        angularUiRouter: 'angular-ui-router/release/angular-ui-router.min',
        restangular: 'restangular/dist/restangular.min',
        ocLazyLoad: 'ocLazyLoad/dist/ocLazyLoad.min',
        uiRouterExtras: 'ui-router-extras/release/ct-ui-router-extras',

        owl: 'owl-carousel/owl-carousel/owl.carousel.min'
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
        ocLazyLoad: {
            deps: ['angular']
        },
        uiRouterExtras: {
            deps: ['angularUiRouter']
        }
    }
});