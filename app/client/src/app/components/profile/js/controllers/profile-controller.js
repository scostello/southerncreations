define(function () {
    'use strict';

    return {
        name: 'ProfileController',
        fn: ['$state', 'AuthService', function ($state, AuthService) {
            var vm = this;

            vm.user = AuthService.getUser();
            vm.engageAdminMode = engageAdminMode;

            function engageAdminMode() {
                $state.go('auth.profile.admin');
            }
        }]
    };
});