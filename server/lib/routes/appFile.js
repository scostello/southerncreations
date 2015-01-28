'use strict';

var _ = require('lodash');

exports.addRoutes = function (app) {

    var headDefaults = {
            appName: 'southerncreations',
            title: 'Southern Creations',
            description: 'Southern Creations - Baked Goodies, Hand Crafted Delights, and Custom Apparel'
        };

    app.all('/', function (req, res) {
        headDefaults = _.assign(headDefaults, {
            feature: {
                css: [
                    '/static/assets/css/home.css'
                ]
            }
        });
        res.render('home', headDefaults);
    });
};