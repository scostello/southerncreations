define([
    'braintree'
], function (braintree) {
    'use strict';

    return {
        name: 'payment',
        fn: [PaymentDirective]
    };

    function PaymentDirective() {
        return {
            restrict: 'AE',
            scope: {
                paymentFormId: '=',
                clientToken: '='
            },
            templateUrl: '/static/app/components/checkout/js/directives/templates/payment-form.html',
            replace: true,
            link: function (scope, element, attrs) {

                scope.submitPayment = submitPayment;

                scope.$watch(function () {
                    return scope.clientToken;
                }, function (clientToken) {
                    if (clientToken) {
                        braintree.setup(clientToken, 'custom', {
                            id: attrs.id
                        });
                    }
                });

                function submitPayment() {}
            }
        };
    }
});