define([
    'lodash'
],
function (_) {
    'use strict';

    return {
        name: 'AppController',
        fn: ['$scope', '$state', 'settings', 'AuthService', 'ShoppingService', function ($scope, $state, settings, AuthService, ShoppingService) {
            var vm = this;


            vm.menuitems = settings.menuitems;
            vm.shoppingCart = ShoppingService.getShoppingCart();
            vm.user = null;
            vm.isLoggedIn = false;
            vm.logout = logout;

            $scope.$watch(AuthService.isLoggedIn, function (value) {
                vm.isLoggedIn = value;
                vm.user = AuthService.getUser();
            });

            $scope.$on('cart:updated', function (evt, cart) {
                vm.shoppingCart = cart;
            });

            function logout() {
                AuthService.logout();
                $state.go('app.home');
            }
        }]
    };
});