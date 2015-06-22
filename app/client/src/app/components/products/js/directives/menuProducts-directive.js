define(function () {
    'use strict';

    return {
        name: 'scMenuProducts',
        fn: [function () {
            return {
                restrict: 'E',
                scope: {
                    menuProducts: '='
                },
                replace: true,
                templateUrl: '/static/app/components/products/views/menu-categories.html'
            };
        }]
    };
});