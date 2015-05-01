define(function () {
    'use strict';

    return {
        name: 'utilityCart',
        fn: ['$state', UtilityCartDirective]
    };

    function UtilityCartDirective($state) {
        return {
            restrict: 'E',
            templateUrl: '/static/app/core/directives/topnavbar/templates/utility-cart-item.html',
            scope: {
                shoppingCart: '='
            },
            replace: true,
            link: function (scope, element) {
                var $quickView = element.find('[role=quickview]');

                // Go to profile.cart state
                element.on('click', _goToShoppingCartState);

                // Display quick view of products in shopping cart
                element.on('mouseenter', _showCartQuickView($quickView));

                // Hide quick view
                element.on('mouseleave', _hideCartQuickView($quickView));
            }
        };

        function _goToShoppingCartState() {
            $state.go('app.cart');
        }

        function _showCartQuickView($qV) {
            return function () {
                $qV.css('display', 'block');
            };
        }

        function _hideCartQuickView($qV) {
            return function () {
                $qV.css('display', 'none');
            };
        }
    }
});