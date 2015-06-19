define(function () {
    'use strict';

    return {
        name: 'SignupController',
        fn: ['$scope', 'UserService', function ($scope, UserService) {
            var vm = this;

            vm.newuser = {};

            vm.submit = function () {
                if (vm.newuser.password !== vm.newuser.confirmpassword) {
                    return;
                }

                UserService.signup(vm.newuser)
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