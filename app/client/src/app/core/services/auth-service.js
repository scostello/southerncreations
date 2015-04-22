define(function () {
    'use strict';

    return {
        name: 'AuthService',
        fn: ['$q', 'API',  'STORAGE_KEYS', 'Restangular', 'localStorageService', 'jwtHelper', function ($q, API, STORAGE_KEYS, Restangular, localStorageService, jwtHelper) {
            var self = this,
                baseLogin = Restangular.all(API.BASE_LOGIN),
                baseSignup = Restangular.all(API.BASE_SIGNIN);

            self.getAuthToken = getAuthToken;
            self.getUser = getUser;
            self.isLoggedIn = isLoggedIn;
            self.isAdmin = isAdmin;
            self.login = login;
            self.logout = logout;
            self.signup = signup;

            function getAuthToken() {
                return localStorageService.get(STORAGE_KEYS.JWT);
            }

            function getUser() {
                var token = self.getAuthToken();
                return token ? jwtHelper.decodeToken(token) : void(0);
            }

            function isLoggedIn() {
                var token = self.getAuthToken();
                return !!(token && !jwtHelper.isTokenExpired(token));
            }

            function login(userData) {
                var dfd = $q.defer();

                baseLogin.post(userData)
                    .then(function (response) {
                        var token = response.token;

                        _setAuthToken(token);

                        dfd.resolve();
                    })
                    .catch(function (err) {
                        dfd.reject(err);
                    });

                return dfd.promise;
            }

            function logout() {
                _deleteAuthToken();
            }

            function signup(newUserData) {
                return baseSignup.post(newUserData);
            }

            function isAdmin() {
                return self.isLoggedIn() && self.getUser().isAdmin;
            }

            function _setAuthToken(token) {
                localStorageService.set(STORAGE_KEYS.JWT, token);
            }

            function _deleteAuthToken() {
                localStorageService.set(STORAGE_KEYS.JWT, null);
            }
        }]
    };
});