define(function () {
    'use strict';

    return {
        name: 'HeaderController',
        fn: ['$scope', 'SettingsService', 'PubSubService', 'AuthService', function ($scope, SettingsService, PubSubService, AuthService) {
            var vm = this;

            vm.toggleMenu = toggleMenu;
            vm.viewProfile = viewProfile;
            vm.isLoggedIn = false;

            function toggleMenu() {
                PubSubService.publish(SettingsService.messages.menutoggle);
            }

            function viewProfile() {

            }

            $scope.$watch(AuthService.isLoggedIn, function (value) {
                vm.isLoggedIn = value;
            });
        }]
    };
});