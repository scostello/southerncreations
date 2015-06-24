define(function () {
    'use strict';

    return {
        name: 'scMenuProducts',
        fn: [function () {
            return {
                restrict: 'E',
                scope: true,
                bindToController: {
                    products: '=',
                    currentProduct: '='
                },
                replace: true,
                templateUrl: '/static/app/components/products/views/menu-categories.html',
                controller: ['$state', function ($state) {
                    var self = this;
                    self.showProduct = function (product) {
                        self.currentProduct = product;
                        $state.go('app.menu.product', {productSlug: product.payload.slug});
                    };
                }],
                controllerAs: 'menuCategoryCtrl'
            };
        }]
    };
});