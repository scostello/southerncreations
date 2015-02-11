(function () {
    'use strict';

    angular.module('southerncreations', [
        'ui.router',
        'restangular',
        'southerncreations.home'
    ])
    .config(['RestangularProvider', function (RestangularProvider) {
        RestangularProvider.setBaseUrl('/api');
    }]);
}());
