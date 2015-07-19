define(function () {
    'use strict';

    return {
        name: 'CheckoutController',
        fn: ['OrderService', 'AddressesService', 'states', CheckoutController]
    };

    function CheckoutController(OrderService, AddressesService, states) {
        var vm = this;
        vm.checkoutView = null;
        vm.checkoutViews = {
            shipping: 'shipping',
            payment: 'payment',
            confirmation: 'confirmation'
        };
        vm.checkout = {
            shipping: {},
            billing: {},
            payment: {}
        };
        vm.states = states;

        vm.submitAddressInfo = submitAddressInfo;
        vm.zipcodeSearch = zipcodeSearch;

        function zipcodeSearch() {
            var zipcode = vm.checkout.shipping.zipcode;

            if (zipcode) {
                AddressesService.zipcodeSearch(zipcode)
                    .then(function (data) {
                        vm.checkout.shipping.city = data.city;
                        vm.checkout.shipping.state = data.state;
                    })
                    .catch(function (err) {

                    });
            }
        }

        function submitAddressInfo(isValid) {

            if (!isValid) {
                return;
            }

            OrderService.nextOrderState(vm.checkout.shipping)
                .then(function () {
                    return OrderService.getPaymentToken();
                })
                .then(function (data) {
                    vm.checkout.payment.clientToken = data.clientToken;
                    vm.checkoutView = vm.checkoutViews.payment;
                });
        }
    }
});