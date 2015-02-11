'use strict';

var express = require('express'),
    compression = require('compression');

exports.addMiddleWare = function (app, config) {

    app.use(config.server.staticUrl, compression());
    app.use(config.server.staticUrl, express.static(config.server.srcFolder));
    app.use(config.server.staticUrl, express.static(config.server.vendorFolder));
    app.use(config.server.staticUrl, function (req, res) {
        res.sendfile('404.html');
    });
};