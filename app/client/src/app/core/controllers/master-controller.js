/**
 * Created by scostello on 3/10/15.
 */
define(function () {
    'use strict';

    return {
        name: 'MasterController',
        fn: ['$scope', 'SettingsService', 'PubSubService', 'AuthService', function ($scope, SettingsService, PubSubService, AuthService) {
            var vm = this;

            vm.menuopen = false;
            vm.menuitems = SettingsService.menuitems;
            vm.isAdmin = false;

            PubSubService.subscribe(SettingsService.messages.menutoggle, function () {
                vm.menuopen = !(vm.menuopen);
            });

            PubSubService.subscribe('$stateChangeSuccess', function () {
                vm.menuopen = false;
            });

            $scope.$watch(AuthService.isAdmin, function (value) {
                vm.isAdmin = value;
            });
        }]
    };
});