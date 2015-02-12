(function () {
    'use strict';

    angular.module('southerncreations.home.controllers', [])
        .controller('HomeController', function () {
            var vm = this;

            vm.items = [
                'one',
                'two',
                'three'
            ];
        });
}());