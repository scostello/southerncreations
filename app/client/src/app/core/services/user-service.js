define([
    'lodash'
], function (_) {
    'use strict';

    UserService.$inject = ['$q', 'WebApi'];
    function UserService($q, WebApi) {
        var self = this;

        self.$user = {};
        self.user = user;
        self.login = login;
        self.signup = signup;
        self.userExists = userExists;

        function user(user) {
            if (user) {
                this.$user = user;
            }

            return this.$user;
        }

        function login(userData) {
            var dfd = $q.defer();

            WebApi.users.login(WebApi.root.links, {data: userData})
                .then(function (user) {
                    dfd.resolve(self.user(user));
                }, function (err) {
                    dfd.reject(err);
                });

            return dfd.promise;
        }

        function signup(newUserData) {
            var dfd = $q.defer();

            WebApi.users.signup(WebApi.root.links, {data: newUserData})
                .then(function (newUser) {
                    dfd.resolve(self.user(newUser));
                }, function (err) {
                    dfd.reject(err);
                });

            return dfd.promise;
        }

        function userExists(email) {
            return WebApi.users.userExists(WebApi.root.links, {params: {email: email}});
        }
    }

    return {
        name: 'UserService',
        fn: UserService
    };
});