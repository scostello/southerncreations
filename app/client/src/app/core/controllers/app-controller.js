/**
 * Created by scostello on 3/10/15.
 */
define(function () {
    'use strict';

    return {
        name: 'AppController',
        fn: ['$scope', '$state', 'SettingsService', 'PubSubService', 'AuthService', function ($scope, $state, SettingsService, PubSubService, AuthService) {
            var vm = this;

            vm.menuopen = false;
            vm.menuitems = SettingsService.menuitems;
            vm.user = null;
            vm.isLoggedIn = false;
            vm.logout = logout;

            PubSubService.subscribe(SettingsService.messages.menutoggle, function () {
                vm.menuopen = !(vm.menuopen);
            });

            PubSubService.subscribe('$stateChangeSuccess', function () {
                vm.menuopen = false;
            });

            $scope.$watch(AuthService.isLoggedIn, function (value) {
                vm.isLoggedIn = value;
                vm.user = AuthService.getUser();
            });

            function logout() {
                AuthService.logout();
                $state.go('app.home');
            }
        }]
    };
});