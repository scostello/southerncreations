define(function () {
    'use strict';

    return {
        name: 'AddressesService',
        fn: ['WebApi', AddressesService]
    };

    function AddressesService(WebApi) {
        var self = this;

        self.getStates = getStates;
        self.zipcodeSearch = zipcodeSearch;

        function getStates(links) {
            return WebApi.addresses.getStates(links);
        }

        function zipcodeSearch(zipcode) {
            return WebApi.addresses.zipcodeSearch(WebApi.root.links, {params: {q: zipcode}})
        }
    }
});