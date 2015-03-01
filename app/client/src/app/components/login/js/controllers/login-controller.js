define(function () {
    'use strict';

    return {
        name: 'LoginController',
        fn: ['$scope', '$state', 'Restangular', 'localStorageService', 'jwtHelper', function ($scope, $state, Restangular, localStorageService, jwtHelper) {
            var baseLogin = Restangular.all('login');
            $scope.user = {};

            $scope.submit = function () {
                if (!$scope.user.username || !$scope.user.password) {
                    return;
                }

                baseLogin.post($scope.user)
                    .then(function (response) {
                        localStorageService.set('jwt', response.token);
                        localStorageService.set('context', jwtHelper.decodeToken(response.token));
                        $state.go('auth.profile');
                    });
            };
        }]
    };
});