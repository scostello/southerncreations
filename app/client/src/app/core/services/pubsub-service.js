define(function () {
    'use strict';

    return {
        name: 'PubSubService',
        fn: ['$rootScope', function ($rootScope) {
            var self = this;

            self.publish = publish;
            self.subscribe = subscribe;

            function publish(message) {
                var args = Array.prototype.splice.call(arguments, 1);
                $rootScope.$broadcast(message, args);
            }

            function subscribe(message, cb) {
                $rootScope.$on(message, cb);
            }
        }]
    };
});