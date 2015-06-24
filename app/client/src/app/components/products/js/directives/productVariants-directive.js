define(function () {
    'use strict';

    return {
        name: 'scProductVariants',
        fn: [function () {
            return {
                restrict: 'E',
                scope: true,
                bindToController: {
                    variants: '=',
                    currentVariant: '='
                },
                replace: true,
                templateUrl: '/static/app/components/products/views/product-variants.html',
                controller: ['$state', function ($state) {
                    var self = this;
                    self.showVariant = function (variant) {
                        self.currentVariant = variant;
                        $state.go('app.menu.product.variant', {variantSlug: variant.payload.slug});
                    };
                }],
                controllerAs: 'prdVariantsCtrl'
            };
        }]
    };
});