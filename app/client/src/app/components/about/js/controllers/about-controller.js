define(function () {
    'use strict';

    var controllerName = 'AboutController',
        AboutController = function () {
            console.log('Hola from about controller!');
        };

    return {
        name: controllerName,
        fn: [AboutController]
    };
});