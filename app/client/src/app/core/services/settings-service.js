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
                    name: 'menu',
                    state: 'app.products'
                },
                {
                    name: 'catering',
                    state: 'app.catering'
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
