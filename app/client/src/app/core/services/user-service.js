define([
    'lodash'
], function (_) {
    'use strict';

    UserService.$inject = ['$rootScope', '$q', '$http', 'API', 'STORAGE_KEYS'];
    function UserService($rootScope, $q, $http, API, STORAGE_KEYS) {
        var self = this;

        self.getAuthToken = getAuthToken;
        self.getUsers = getUsers;
        self.isAdmin = isAdmin;
        self.isLoggedIn = isLoggedIn;
        self.login = login;
        self.logout = logout;
        self.signup = signup;

        function getAuthToken() {

        }

        function getUsers() {
            var dfd = $q.defer();

            $http({
                    method: 'GET',
                    utl: '/api/users'
                })
                .success(function (users) {
                    dfd.resolve(users);
                })
                .error(function (err) {
                    dfd.reject(err);
                });

            return dfd.promise;
        }

        function login(userData) {
            var dfd = $q.defer();

            $http.post('/api/users/login', userData)
                .then(function (response) {
                    var user = response.data;
                    _setAuthToken(user.token);
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
            var dfd = $q.defer();

            $http({
                    method: 'POST',
                    url: '/api/users/signup',
                    data: newUserData
                })
                .success(function (newUser) {
                    dfd.resolve(newUser);
                })
                .error(function (err) {
                    dfd.reject(err);
                });

            return dfd.promise;
        }

        function isLoggedIn() {

        }

        function isAdmin() {

        }

        function _setAuthToken(token) {

        }

        function _deleteAuthToken() {

        }
    }

    return {
        name: 'UserService',
        fn: UserService
    };
});