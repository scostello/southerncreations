define([
    'lodash'
], function (_) {
    'use strict';

    UserService.$inject = ['WebApi'];
    function UserService(WebApi) {
        var self = this;

        self.login = login;
        self.signup = signup;
        self.userExists = userExists;

        function login(userData) {
            return WebApi.users.login(WebApi.root.links, {data: userData});
        }

        function signup(newUserData) {
            return WebApi.users.signup(WebApi.root.links, {data: newUserData});
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