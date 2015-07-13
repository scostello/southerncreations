define(function () {
    'use strict';

    return {
        name: 'CheckoutController',
        fn: ['AddressesService', CheckoutController]
    };

    function CheckoutController(AddressesService) {
        var vm = this;
        vm.checkout = {
            billing: {},
            shipping: {},
            payment: {}
        };
        vm.zipcodeSearch = zipcodeSearch;

        function zipcodeSearch() {
            var zipcode = vm.checkout.shipping.zipcode;

            if (zipcode) {
                AddressesService.zipcodeSearch(zipcode)
                    .then(function (data) {
                        vm.checkout.shipping.city = data.city;
                        vm.checkout.shipping.state = data.state;
                    }, function (err) {

                    });
            }
        }
    }
});