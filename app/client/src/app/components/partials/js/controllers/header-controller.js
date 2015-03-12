define(function () {
    'use strict';

    return {
        name: 'HeaderController',
        fn: ['SettingsService', 'PubSubService', function (SettingsService, PubSubService) {
            var vm = this;
            
            vm.toggleMenu = toggleMenu;

            function toggleMenu() {
                PubSubService.publish(SettingsService.messages.menutoggle);
            }
        }]
    };
});