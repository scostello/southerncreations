define(function () {
    'use strict';

    return {
        name: 'AddressesService',
        fn: ['WebApi', AddressesService]
    };

    function AddressesService(WebApi) {
        var self = this;

        self.zipcodeSearch = zipcodeSearch;

        function zipcodeSearch(zipcode) {
            return WebApi.addresses.zipcodeSearch(WebApi.root.links, {params: {q: zipcode}})
        }
    }
});