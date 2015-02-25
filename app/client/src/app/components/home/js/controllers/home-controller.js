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
                'five'
            ];
        };

    return {
        name: controllerName,
        fn: ['$scope', HomeController]
    };
});