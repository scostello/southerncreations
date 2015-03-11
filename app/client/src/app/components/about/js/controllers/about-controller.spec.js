define([
    'app/app',
    'angularMocks',
    './about-controller'
], function(app, mocks, aboutController) {
    'use strict';

    var $q, $rootScope, createAboutController;


    describe('AboutController', function() {
        beforeEach(mocks.inject(function ($injector) {
            $q = $injector.get('$q');
            $rootScope = $injector.get('$rootScope');

            var $controller = $injector.get('$controller');
            createAboutController = function () {
                return $controller(aboutController, {'$scope': $rootScope});
            };
        }));

        it('puts the lotion on the skin', function () {
            expect(true).toBe(true);
        });
    });
});