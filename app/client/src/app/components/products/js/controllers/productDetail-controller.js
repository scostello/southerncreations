define([
    'lodash'
],
function (_) {
    'use strict';

    return {
        name: 'ProductDetailController',
        fn: ['$stateParams', ProductDetailController]
    };

    function ProductDetailController($stateParams) {
        var vm = this;

        console.log($stateParams);
    }
});