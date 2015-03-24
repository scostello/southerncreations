define([
    'angular'
], function (angular) {
    'use strict';

    return {
        name: 'windowClick',
        fn: ['$window', function ($window) {
            return {
                restrict: 'E',
                scope: {
                    menuOpen: '='
                },
                link: function (scope) {
                    scope.$watch('menuOpen', function (menuIsOpen) {
                        angular.element($window).off('click', globalClickHandler);

                        if (menuIsOpen) {
                            angular.element($window).on('click', globalClickHandler);
                        }
                    });

                    function globalClickHandler(evt) {
                        if (angular.element(evt.target).attr('id') === 'application-content') {
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