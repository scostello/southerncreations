define(function () {
    'use strict';

    return {
        name: 'scProductVariants',
        fn: ['$state', function ($state) {
            return {
                restrict: 'E',
                scope: {
                    variants: '=',
                    currentVariant: '='
                },
                replace: true,
                templateUrl: '/static/app/components/products/js/directives/templates/product-variants.html',
                link: function (scope) {
                    scope.showVariant = function (variant) {
                        scope.currentVariant = variant;
                        $state.go('app.menu.product.variant', {variantSlug: variant.payload.slug});
                    };
                }
            };
        }]
    };
});