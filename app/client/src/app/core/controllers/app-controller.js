define([
    'lodash'
],
function (_) {
    'use strict';

    return {
        name: 'AppController',
        fn: ['$scope', '$state', 'settings', 'shoppingCart', 'UserService', function ($scope, $state, settings, shoppingCart, UserService) {
            var vm = this;
            vm.menuitems = settings.menuitems;
            vm.isLoggedIn = false;
            vm.shoppingCart = shoppingCart;
            vm.logout = logout;

            $scope.$watch(UserService.isLoggedIn, function (value) {
                vm.isLoggedIn = value;
            });

            function logout() {
                UserService.logout();
                $state.go('app.home');
            }
        }]
    };
});