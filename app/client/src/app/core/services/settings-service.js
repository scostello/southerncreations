define([
    'lodash'
],
function (_) {
    'use strict';

    return {
        name: 'SettingsService',
        fn: ['$q', '$http', 'API', 'STORAGE_KEYS', 'localStorageService', SettingsService]
    };

    function SettingsService($q, $http, API, STORAGE_KEYS, localStorageService) {
        var self = this,
            menuitems = [
                {
                    name: 'home',
                    state: 'app.home'
                },
                {
                    name: 'menu',
                    state: 'app.menu'
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
                $http({
                    method: 'GET',
                    url: '/api/settings'
                })
                .success(function (settings) {
                    _setStorageSettings(_.assign({}, settings, {
                        menuitems: menuitems
                    }));

                    dfd.resolve(settings);
                })
                .error(function (err) {
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
