/**
 * Created by scostello on 3/10/15.
 */
define(function () {
    'use strict';

    return {
        name: 'AppController',
        fn: ['$scope', 'SettingsService', 'PubSubService', 'AuthService', function ($scope, SettingsService, PubSubService, AuthService) {
            var vm = this;

            vm.menuopen = false;
            vm.menuitems = SettingsService.menuitems;
            vm.user = null;
            vm.isLoggedIn = false;

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
        }]
    };
});