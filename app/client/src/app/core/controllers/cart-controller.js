define(function () {
    'use strict';

    return {
        name: 'CartController',
        fn: ['$state', 'OrderService', 'UserService', CartController]
    };

    function CartController($state, OrderService, UserService) {
        var vm = this,
            cartViews = {
                email: 'email',
                login: 'login',
                signup: 'signup'
            };

        vm.checkout = _checkout;
        vm.checkUser = _checkUser;
        vm.proceedToCheckout = _proceedToCheckout;
        vm.tagOrder = _tagOrder;

        function _checkout() {
            if (!OrderService.isRegistered()) {
                vm.cartView = cartViews.email;
            } else {
                $state.go('app.checkout');
            }
        }

        function _checkUser(isValid) {
            if (!isValid) {
                return;
            }

            UserService.userExists(vm.order.email)
                .then(function (data) {
                    vm.cartView = data.userExists ? cartViews.login : cartViews.signup;
                }, function (err) {
                    console.log(err);
                });
        }

        function _proceedToCheckout(isValid) {
            var order = OrderService.order(),
                payload = {
                    username: vm.order.email,
                    password: vm.order.password,
                    orderNumber: order.payload.number,
                    orderToken: order.payload.token
                };

            if (!isValid) {
                return;
            }

            UserService.login(payload)
                .then(function (user) {

                }, function (err) {

                });
        }

        function _tagOrder() {
            OrderService.checkUserExists({email: vm.order.email});
        }
    }
});