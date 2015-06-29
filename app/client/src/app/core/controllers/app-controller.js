define([
    'lodash'
],
function (_) {
    'use strict';

    return {
        name: 'AppController',
        fn: ['$scope', '$state', 'settings', 'order', 'UserService', 'OrderService', function ($scope, $state, settings, order, UserService, OrderService) {
            var vm = this;
            vm.menuitems = settings.menuitems;
            vm.isLoggedIn = false;
            vm.order = order;
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