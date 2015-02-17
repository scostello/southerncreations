define([
    'angular',
    'jquery',
    './app',
    'domReady'
], function (angular, $, app) {
    'use strict';

    angular.bootstrap(document.getElementsByTagName('body')[0], [app.name]);

    // The following is required if you want AngularJS Scenario tests to work
    $('html').addClass('ng-app: ' + app.name);
});

