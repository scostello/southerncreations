define(function () {
    'use strict';

    return {
        name: 'AppController',
        fn: ['$scope', '$state', 'settings', 'AuthService', function ($scope, $state, settings, AuthService) {
            var vm = this;

            vm.menuopen = false;
            vm.menuitems = settings.menuitems;
            vm.user = null;
            vm.isLoggedIn = false;
            vm.logout = logout;

            $scope.$watch(AuthService.isLoggedIn, function (value) {
                vm.isLoggedIn = value;
                vm.user = AuthService.getUser();
            });

            function logout() {
                AuthService.logout();
                $state.go('app.home');
            }
        }]
    };
});