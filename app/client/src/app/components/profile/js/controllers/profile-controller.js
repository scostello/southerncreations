define(function () {
    'use strict';

    return {
        name: 'ProfileController',
        fn: ['$scope', 'AuthService', function ($scope, AuthService) {
            var user = AuthService.getUserContext();

            $scope.profile = user;

            $scope.createProducts = function () {};
        }]
    };
});