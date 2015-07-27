define(function () {
    'use strict';

    return {
        name: 'scDeliveryMethod',
        fn: [DeliveryMethodDirective]
    };

    function DeliveryMethodDirective() {
        return {
            restrict: 'AE',
            scope: {
                choices: '=',
                method: '='
            },
            templateUrl: '/static/app/components/checkout/js/directives/templates/delivery-method.html',
            replace: true
        };
    }
});