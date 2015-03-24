define([
    'jquery',
    'fitvid'
],function ($) {
    'use strict';

    return {
        name: 'fitvid',
        fn: [function () {
            return {
                restrict: 'AE',
                link: function (scope, element) {
                    $(element).fitVids();
                }
            };
        }]
    };
});