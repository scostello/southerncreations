define(function () {
    'use strict';

    return {
        name: 'SignupController',
        fn: ['$scope', 'AuthService', function ($scope, AuthService) {
            var vm = this;

            vm.newuser = {};

            vm.submit = function () {
                if (vm.newuser.password !== vm.newuser.confirmpassword) {
                    return;
                }

                AuthService.signup(vm.newuser)
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (err) {
                        // error
                    });
            };
        }]
    };
});