define(function () {
    'use strict';

    return {
        name: 'LoginController',
        fn: ['$scope', '$state', 'AuthService', function ($scope, $state, AuthService) {
            var vm = this;

            vm.submit = submit;
            vm.user = {};

            function submit() {
                if (!vm.user.username || !vm.user.password) {
                    return;
                }

                AuthService.login(vm.user)
                    .then(function () {
                        $state.go(AuthService.isAdmin() ? 'app.profile.admin.dashboard' : 'app.profile');
                    })
                    .catch(function (err) {
                        // error
                    });
            };
        }]
    };
});