define([
    'lodash'
],
function (_) {
    'use strict';

    return {
        name: 'AppController',
        fn: ['$scope', '$state', 'settings', 'order', 'AppStateService', 'OrderService', 'UserService', function ($scope, $state, settings, order, AppStateService, OrderService, UserService) {
            var vm = this;
            vm.menuitems = settings.menuitems;
            vm.isLoggedIn = false;
            vm.order = order;
            vm.currentState = null;
            vm.isCheckoutState = _isCheckoutState;
            vm.getOrderItems = _getOrderItems;
            vm.getTotalItems = _getTotalItems;
            vm.getOrderTotal = _getOrderTotal;
            vm.openMenuShelf = AppStateService.openMenuShelf;
            vm.openCartShelf = AppStateService.openCartShelf;
            vm.closeShelves  = AppStateService.closeShelves;
            vm.logout = logout;

            $scope.$watch(UserService.isLoggedIn, function (value) {
                vm.isLoggedIn = value;
            });

            $scope.$watch(AppStateService.getCurrentShelf, function (shelf) {
                vm.shelf = shelf;
            });

            $scope.$on('$stateChangeSuccess', function (evt, toState) {
                vm.currentState = toState;
                AppStateService.closeShelves();
            });

            function _isCheckoutState() {
                return vm.currentState.data && vm.currentState.data.isCheckout;
            }

            function _getOrderItems() {
                return OrderService.getOrderItems();
            }

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