define([
    'moment'
], function (moment) {
    'use strict';

    return {
        name: 'CheckoutController',
        fn: ['$state', 'OrderService', 'AddressesService', 'states', CheckoutController]
    };

    function CheckoutController($state, OrderService, AddressesService, states) {
        var vm = this;
        vm.checkout = {
            shipping: {},
            delivery: {
                method: 'delivery',
                choices: [
                    {
                        value: 'delivery',
                        label: 'Delivers - ' + moment().add(5, 'days').format('MMMM D')
                    },
                    {
                        value: 'pickup',
                        label: 'Pick-Up'
                    }
                ]
            },
            billing: {},
            payment: {}
        };
        vm.states = states;
        vm.checkout.shipping.state = vm.states[0];

        vm.phoneNumberToolTip = 'We\'ll only need to contact you if there are questions about your order.';
        vm.submitAddressInfo = submitAddressInfo;
        vm.submitDeliveryInfo = submitDeliveryInfo;
        vm.zipcodeSearch = zipcodeSearch;
        vm.invalid = {
            touched: function (input) {
                return input.$invalid && input.$touched;
            },
            pristine: function (input) {
                return input.$invalid && !input.$pristine;
            }
        };

        function zipcodeSearch() {
            var zipcode = vm.checkout.shipping.zipcode;

            if (zipcode) {
                AddressesService.zipcodeSearch(zipcode)
                    .then(function (data) {
                        vm.addressForm.shippingZipcode.$setValidity('zipcodeExists', true);
                        vm.checkout.shipping.city = data.city;
                        vm.checkout.shipping.state = _.find(vm.states, function (state) {
                            return state.abbreviation === data.state;
                        });
                    })
                    .catch(function (err) {
                        vm.addressForm.shippingZipcode.$setValidity('zipcodeExists', false);
                    });
            }
        }

        function submitAddressInfo(isValid) {
            var billing = vm.checkout.billing.useShipping ? vm.checkout.shipping : vm.checkout.billing,
                shipping = vm.checkout.shipping,
                payload = {
                    currentState: 'address',
                    nextState: 'delivery',
                    billingAddress: billing,
                    shippingAddress: shipping
                };

            if (!isValid) {
                return;
            }

            OrderService.nextOrderState(payload)
                .then(_goToNextState);
        }

        function submitDeliveryInfo(isValid) {
            var payload = {
                    currentState: 'delivery',
                    nextState: 'payment',
                    delivery: vm.checkout.delivery
                };

            if (!isValid) {
                return;
            }

            OrderService.nextOrderState(payload)
                .then(_goToNextState);
        }

        function submitPaymentInfo(isValid) {
            var payload = {
                currentState: 'payment',
                nextState: 'confirm',
                payment: vm.checkout.payment
            };

            if (!isValid) {

            }

            OrderService.nextOrderState(payload)
                .then(_goToNextState);
        }

        function _goToNextState(order) {
            $state.transitionTo('app.checkout.' + order.payload.state);
        }
    }
});