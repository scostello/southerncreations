define(function () {
    'use strict';

    return {
        name: 'HeaderController',
        fn: ['$scope', 'SettingsService', 'PubSubService', 'AuthService', function ($scope, SettingsService, PubSubService, AuthService) {
            var vm = this;

            vm.toggleMenu = toggleMenu;
            vm.user = null;
            vm.isLoggedIn = false;

            function toggleMenu() {
                PubSubService.publish(SettingsService.messages.menutoggle);
            }

            $scope.$watch(AuthService.isLoggedIn, function (value) {
                vm.isLoggedIn = value;
                vm.user = AuthService.getUser();
            });
        }]
    };
});