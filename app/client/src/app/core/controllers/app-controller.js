define([
    'lodash'
],
function (_) {
    'use strict';

    return {
        name: 'AppController',
        fn: ['$scope', '$state', 'settings', 'order', 'OrderService', 'UserService', function ($scope, $state, settings, order, OrderService, UserService) {
            var vm = this;
            vm.menuitems = settings.menuitems;
            vm.isLoggedIn = false;
            vm.order = order;
            vm.getTotalItems = _getTotalItems;
            vm.getOrderTotal = _getOrderTotal;
            vm.logout = logout;

            $scope.$watch(UserService.isLoggedIn, function (value) {
                vm.isLoggedIn = value;
            });

            function _getTotalItems() {
                return OrderService.getTotalItems();
            }

            function _getOrderTotal() {
                return OrderService.getOrderTotal();
            }

            function logout() {
                UserService.logout();
                $state.go('app.home');
            }
        }]
    };
});