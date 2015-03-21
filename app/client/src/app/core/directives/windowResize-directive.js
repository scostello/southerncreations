/**
 * Created by scostello on 3/12/15.
 */
define([
    'angular',
    'lodash'
], function (angular, _) {
    'use strict';

    return {
        name: 'windowResize',
        fn: ['$window', 'RESOLUTIONS', function ($window, RESOLUTIONS) {
            return {
                restrict: 'E',
                scope: {
                    menuOpen: '='
                },
                link: function (scope) {
                    angular.element($window).on('resize', _.debounce(resizeWindow, 250));

                    function resizeWindow() {
                        var width = this.innerWidth;

                        if (width > RESOLUTIONS.TABLET) {
                            scope.$apply(function () {
                                scope.menuOpen = false;
                            });
                        }
                    }
                }
            };
        }]
    };
});