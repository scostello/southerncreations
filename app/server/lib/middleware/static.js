'use strict';

var express = require('express'),
    compression = require('compression');

module.exports = function (app) {
    var config = app.get('config');
    app.use(config.staticUrl, compression());
    app.use(config.staticUrl, express.static(config.srcFolder));
    app.use(config.staticUrl, function (req, res) {
        res.sendfile('404.html');
    });
};