define([
    'jquery'
], function ($) {
    'use strict';

    return {
        name: 'scToggleState',
        fn: [function () {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var $curtain = $('#curtain'),
                        $body = $('body');

                    element.on('click', function (e) {
                        e.preventDefault();

                        var classname = attrs.scToggleState;

                        if (classname) {
                            if ($body.hasClass(classname)) {
                                $body.removeClass(classname);
                                $curtain.removeClass('curtain-visible').off('click');
                            } else {
                                $body.addClass(classname);
                                $curtain.addClass('curtain-visible').off('click').on('click', function (e) {
                                    $body.removeClass(classname);
                                    $curtain.removeClass('curtain-visible');
                                });
                            }
                        }
                    });
                }
            };
        }]
    };
});
