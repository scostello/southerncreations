define(function () {
    'use strict';

    return {
        name: 'LoginController',
        fn: ['$scope', '$state', 'AuthService', function ($scope, $state, AuthService) {
            $scope.user = {};

            $scope.submit = function () {
                if (!$scope.user.username || !$scope.user.password) {
                    return;
                }

                AuthService.login($scope.user)
                    .then(function () {
                        $state.go('auth.profile');
                    })
                    .catch(function (err) {
                        // error
                    });
            };
        }]
    };
});