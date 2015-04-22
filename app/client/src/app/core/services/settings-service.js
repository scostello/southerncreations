define([
    'lodash'
],
function (_) {
    'use strict';

    return {
        name: 'SettingsService',
        fn: ['$q', 'API', 'STORAGE_KEYS', 'Restangular', 'localStorageService', SettingsService]
    };

    function SettingsService($q, API, STORAGE_KEYS, Restangular, localStorageService) {
        var self = this,
            baseSettings = Restangular.oneUrl(API.BASE_SETTINGS),
            menuitems = [
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

        self.getSettings = getSettings;

        function getSettings() {
            var dfd = $q.defer(),
                cachedSettings = _getStorageSettings();

            if (cachedSettings) {
                dfd.resolve(cachedSettings);
            } else {
                baseSettings.get()
                    .then(function (settings) {
                        _setStorageSettings(_.assign({}, settings, {
                            menuitems: menuitems
                        }));

                        dfd.resolve(settings);
                    })
                    .catch(function (err) {
                        dfd.reject(err);
                    });
            }

            return dfd.promise;
        }

        function _getStorageSettings() {
            return localStorageService.get(STORAGE_KEYS.SETTINGS);
        }

        function _setStorageSettings(settings) {
            localStorageService.set(STORAGE_KEYS.SETTINGS, settings);
        }
    }
});
