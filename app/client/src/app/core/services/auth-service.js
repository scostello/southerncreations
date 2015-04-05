define(function () {
    'use strict';

    return {
        name: 'AuthService',
        fn: ['$q', 'API',  'AUTH', 'Restangular', 'localStorageService', 'jwtHelper', function ($q, API, AUTH, Restangular, localStorageService, jwtHelper) {
            var self = this,
                baseLogin = Restangular.all(API.BASE_LOGIN),
                baseSignup = Restangular.all(API.BASE_SIGNIN);

            self.getAuthToken = getAuthToken;
            self.getUser = getUser;
            self.isLoggedIn = isLoggedIn;
            self.isAdmin = isAdmin;
            self.login = login;
            self.signup = signup;

            function getAuthToken() {
                return localStorageService.get(AUTH.JWT_KEY);
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

            function signup(newUserData) {
                return baseSignup.post(newUserData);
            }

            function isAdmin() {
                return self.isLoggedIn() && self.getUser().isAdmin;
            }

            function _setAuthToken(token) {
                localStorageService.set(AUTH.JWT_KEY, token);
            }
        }]
    };
});