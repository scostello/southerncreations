define([
    'jquery',
    'owl'
], function ($) {
    'use strict';

    return {
        name: 'owlCarousel',
        fn: [function () {
            return {
                restrict: 'E',
                scope: {
                    owlOptions: '='
                },
                link: function (scope, element) {
                    var $element = $(element);

                    $element.owlCarousel(scope.owlOptions);
                }
            };
        }]
    };
});