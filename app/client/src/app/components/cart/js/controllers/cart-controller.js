define(function () {
    'use strict';

    return {
        name: 'CartController',
        fn: ['OrderService', CartController]
    };

    function CartController(OrderService) {
        var vm = this;

        vm.order = OrderService.order();;
        vm.working = '';
        vm.updateLineItem = _updatelineItem;
        vm.removeLineItem = _removeLineItem;

        function _updatelineItem(lineItem) {
            OrderService.updateLineItem(lineItem, lineItem.payload.quantity)
                .then(function () {

                });
        }

        function _removeLineItem(lineItem) {
            OrderService.removeLineItem(lineItem)
                .then(function () {

                });
        }
    }
});