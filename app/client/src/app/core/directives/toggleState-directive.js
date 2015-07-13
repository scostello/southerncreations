define([
    'jquery'
], function ($) {
    'use strict';

    return {
        name: 'scToggleState',
        fn: ['$rootScope', function ($rootScope) {
            return {
                restrict: 'A',
                scope: {
                    curtainState: '='
                },
                link: function (scope, element, attrs) {
                    var $body = $('body');

                    scope.showSidebar = function () {
                        var classname = attrs.scToggleState;
                        $body.addClass(classname);
                        $rootScope.$broadcast('curtain:show');
                        //$curtain.removeClass('curtain-visible').off('click');
                    };

                    scope.closeCurtain = function () {
                        var classname = attrs.scToggleState;
                        $body.removeClass(classname);
                        $rootScope.$broadcast('curtain:close');
                    };

                    $rootScope.$on('shelf:close', function () {
                        $body.removeClass(classname);
                    });
                }
            };
        }]
    };
});
