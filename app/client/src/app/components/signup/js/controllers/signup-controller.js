define(function () {
    'use strict';

    var controllerName = 'SignupController',
        SignupController = function ($scope, Restangular) {
            var baseSignup = Restangular.all('signup');

            $scope.newuser = {};

            $scope.submit = function () {
                if ($scope.newuser.password !== $scope.newuser.confirmpassword) {
                    return;
                }

                baseSignup.post($scope.newuser);
            };
        };

    return {
        name: controllerName,
        fn: ['$scope', 'Restangular', SignupController]
    };
});