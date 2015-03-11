define(function () {
    'use strict';

    return {
        name: 'SettingsService',
        fn: [function () {
            var self = this;

            self.messages = {
                menutoggle: 'master.menu.toggle'
            };

            self.menuitems = [
                {
                    name: 'home',
                    state: 'app.home'
                },
                {
                    name: 'products',
                    state: 'app.products'
                },
                {
                    name: 'about',
                    state: 'app.about'
                },
                {
                    name: 'contact',
                    state: 'app.contact'
                }
            ];
        }]
    };
});
