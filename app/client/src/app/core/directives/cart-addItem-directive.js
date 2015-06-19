define(function () {
    'use strict';

    return {
        name: 'scCartAddItem',
        fn: ['ShoppingCart', function (ShoppingCart) {
            return {
                restrict: 'E',
                scope: {
                    id: '@',
                    name: '@',
                    price: '@',
                    quantity: '@',
                    quantityMax: '@',
                    data: '='
                },
                transclude: true,
                template: '',
                link: function (scope, element, attrs) {

                }
            };
        }]
    };
});