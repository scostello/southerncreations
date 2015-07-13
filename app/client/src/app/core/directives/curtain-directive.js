define(function () {
    'use strict';

    return {
        name: 'scCurtain',
        fn: ['$rootScope', function ($rootScope) {
            return {
                restrict: 'AE',
                template: '<div ng-transclude=""></div>',
                transclude: true,
                replace: true,
                link: function (scope, element, attrs) {
                    var classname = attrs.visibleClass;

                    $rootScope.$on('curtain:show', function () {
                        element.addClass(classname);
                    });

                    $rootScope.$on('curtain:close', function () {
                        element.removeClass(classname);
                    });

                    scope.closeCurtain = function () {
                        element.removeClass(classname);
                        $rootScope.$broadcast('shelf:close');
                    };
                }
            };
        }]
    };
});