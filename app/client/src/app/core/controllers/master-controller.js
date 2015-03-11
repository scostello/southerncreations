/**
 * Created by scostello on 3/10/15.
 */
define(function () {
    'use strict';

    return {
        name: 'MasterController',
        fn: ['SettingsService', 'PubSubService', function (SettingsService, PubSubService) {
            var vm = this;

            vm.menuopen = false;
            vm.menuitems = SettingsService.menuitems;

            PubSubService.subscribe(SettingsService.messages.menutoggle, function () {
                vm.menuopen = !(vm.menuopen);
            });
        }]
    };
});