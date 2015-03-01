define(function () {
    'use strict';

    return {
        name: 'ProfileController',
        fn: ['$scope', 'Restangular', 'localStorageService', 'jwtHelper', function ($scope, Restangular, localStorageService, jwtHelper) {
            var token = localStorageService.get('jwt'),
                baseProducts = Restangular.all('products');

            $scope.profile = jwtHelper.decodeToken(token);

            $scope.createProducts = function () {
                baseProducts.post({foo: 'bar'})
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            };
        }]
    };
});