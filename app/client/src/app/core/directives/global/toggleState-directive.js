define([
    'jquery'
], function ($) {
    'use strict';

    return {
        name: 'toggleState',
        fn: [function () {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var $element = $(element),
                        $body = $('body');

                    $element.on('click', function (e) {
                        e.preventDefault();

                        var classname = attrs.toggleState;

                        if (classname) {
                            if ($body.hasClass(classname)) {
                                $body.removeClass(classname);
                            } else {
                                $body.addClass(classname);
                            }
                        }
                    });
                }
            };
        }]
    };
});
