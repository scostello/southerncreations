define(function () {
    'use strict';

    return {
        name: 'CartController',
        fn: ['$scope', '$state', 'AppStateService', 'OrderService', 'UserService', CartController]
    };

    function CartController($scope, $state, AppStateService, OrderService, UserService) {
        var vm = this,
            cartViews = {
                email: 'email',
                login: 'login',
                signup: 'signup'
            };

        vm.cartView = null;
        vm.checkout = _checkout;
        vm.checkUser = _checkUser;
        vm.proceedToCheckout = _proceedToCheckout;
        vm.removeLineItem = _removeLineItem;

        $scope.$watch(AppStateService.getCurrentShelf, function (shelf) {
            if (!shelf) {
                vm.cartView = null;
            }
        });

        function _checkout() {
            var orderState = OrderService.order().payload.state;

            if (!OrderService.isRegistered()) {
                vm.cartView = cartViews.email;
            } else if (orderState !== 'cart') {
                $state.go('app.checkout.' + orderState);
            } else {
                OrderService.nextOrderState()
                    .then(function (order) {
                        $state.go('app.checkout.' + order.payload.state);
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            }
        }

        function _checkUser(isValid) {
            if (!isValid) {
                return;
            }

            UserService.userExists(vm.order.email)
                .then(function (data) {
                    vm.cartView = data.userExists ? cartViews.login : cartViews.signup;
                })
                .catch(function (err) {
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
                .then(function () {
                    return OrderService.nextOrderState();
                })
                .catch(function (err) {
                    console.log(err);
                })
                .then(function (order) {
                    $state.go('app.checkout.' + order.payload.state);
                })
                .catch(function (err) {
                    console.log(err);
                });
        }

        function _removeLineItem(lineItem) {
            OrderService.removeLineItem(lineItem)
                .then(function () {

                })
                .catch(function () {

                });
        }
    }
});