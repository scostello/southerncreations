'use strict';

var http = require('http');

// npm modules
var express = require('express'),
    swig = require('swig'),
    morgan = require('morgan'),
    errorhandler = require('errorhandler'),
    bodyParser = require('body-parser');

// local modules
var config = require('./config'),
    protectJSON = require('./lib/protectJSON');

// server.js variables
var app = express(),
    server = http.createServer(app),
    env = process.env.NODE_ENV || 'development',
    port = process.env.PORT || 3030,
    envConfig = config[env];

app.set('view cache', false);
swig.setDefaults({
    cache: false,
    loader: swig.loaders.fs(envConfig.server.srcFolder + '/views/layouts')
});
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', [
    envConfig.server.srcFolder + '/views/layouts/'
]);
app.use(morgan('dev'));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded()); // to support URL-encoded bodies

// Adding routes

require('./lib/routes/static').addRoutes(app, envConfig, env);
require('./lib/routes/appFile').addRoutes(app, envConfig, env);

app.use(protectJSON);

if (env === 'development') {
    app.use(errorhandler());
}

server.listen(port, function () {
    console.log('Server is listening on port ' + port);
});
