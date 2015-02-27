define(function () {
    'use strict';

    var controllerName = 'HomeController',
        HomeController = function () {
            var vm = this;
            vm.items = [
                'one',
                'two',
                'three',
                'four',
                'five',
                'six'
            ];
        };

    return {
        name: controllerName,
        fn: ['$scope', HomeController]
    };
});