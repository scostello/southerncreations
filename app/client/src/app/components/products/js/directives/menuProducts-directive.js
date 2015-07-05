define(function () {
    'use strict';

    return {
        name: 'scMenuProducts',
        fn: ['$state', function ($state) {
            return {
                restrict: 'E',
                scope: {
                    products: '=',
                    currentProduct: '='
                },
                replace: true,
                templateUrl: '/static/app/components/products/js/directives/templates/menu-products.html',
                link: function (scope) {
                    scope.showProduct = function (product) {
                        scope.currentProduct = product;
                        $state.go('app.menu.product', {productSlug: product.payload.slug});
                    };
                }
            };
        }]
    };
});