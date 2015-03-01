define(function () {
    'use strict';

    return {
        name: 'AboutController',
        fn: ['$rootScope', '$timeout', function ($rootScope, $timeout) {
            $timeout(function () {
                $rootScope.$broadcast('boom');
            }, 2000);
        }]
    };
});