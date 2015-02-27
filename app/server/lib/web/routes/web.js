'use strict';

module.exports = function (app) {

    var headDefaults = {
            appName: 'southerncreations',
            title: 'Southern Creations',
            description: 'Southern Creations - Baked Goodies, Hand Crafted Delights, and Custom Apparel',
            feature: {
                css: [
                    '/static/assets/css/app.css'
                ],
                js: [
                    '/static/angular/angular.min.js',
                    '/static/angular-sanitize/angular-sanitize.min.js',
                    '/static/angular-ui-router/release/angular-ui-router.min.js',
                    '/static/restangular/dist/restangular.min.js',
                    '/static/jquery/dist/jquery.min.js',
                    '/static/lodash/dist/lodash.min.js',
                    '/static/owl-carousel/owl-carousel/owl.carousel.min.js',
                    '/static/app/app.module.js',
                    '/static/app/app.routes.js',
                    '/static/app/components/home/js/controllers/home-controller.js',
                    '/static/app/components/home/js/home-module.js'
                ]
            }
        };

    app.all('/', function (req, res) {
        res.render('index', headDefaults);
    });
};