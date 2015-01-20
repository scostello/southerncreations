'use strict';

var _ = require('lodash');

exports.addRoutes = function (app) {

    var headDefaults = {
        appName: 'southerncreations',
        title: 'Southern Creations',
        description: 'Southern Creations - Baked Goodies, Hand Crafted Delights, and Custom Apparel'
    };

    app.all('/', function (req, res) {
        res.render('index', headDefaults);
    });
};