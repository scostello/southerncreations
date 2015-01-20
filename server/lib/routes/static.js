'use strict';

var express = require('express'),
    compression = require('compression');

exports.addRoutes = function (app, config, env) {

    app.use(config.server.staticUrl, compression());

    if (env === 'production') {
        app.use(config.server.staticUrl, express.static(config.server.distFolder));
        app.use(config.server.staticUrl, express.static(config.server.vendorFolder));
        app.use(config.server.staticUrl, function (req, res) {
            res.sendfile('404.html');
        });
    } else {
        app.use(config.server.staticUrl, express.static(config.server.srcFolder));
        app.use(config.server.staticUrl, express.static(config.server.vendorFolder));
        app.use(config.server.staticUrl, function (req, res) {
            res.sendfile('404.html');
        });
    }
};