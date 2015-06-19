define(function () {
    'use strict';

    return {
        name: 'LoginController',
        fn: ['$scope', '$state', 'UserService', function ($scope, $state, UserService) {
            var vm = this;

            vm.submit = submit;
            vm.user = {};

            function submit() {
                if (!vm.user.username || !vm.user.password) {
                    return;
                }

                UserService.login(vm.user)
                    .then(function (user) {
                        $state.go(user.isAdmin ? 'app.profile.admin.dashboard' : 'app.profile');
                    })
                    .catch(function (err) {
                        // error
                    });
            }
        }]
    };
});