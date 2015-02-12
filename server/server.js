'use strict';

var http = require('http');

// npm modules
var express = require('express'),
    swig = require('swig'),
    morgan = require('morgan'),
    errorhandler = require('errorhandler'),
    bodyParser = require('body-parser');

// local modules
var config = require('./config');

// server.js variables
var app = express(),
    server = http.createServer(app),
    env = process.env.NODE_ENV || 'development',
    port = process.env.PORT || 3030,
    router = express.Router(),
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
require('./middlewares/static').addMiddleWare(app, envConfig);
require('./middlewares/protectJson').protect(app);
require('./controllers/all').addRoutes(app);
require('./controllers/products').addRoutes(router);

app.use('/api', router);

if (env === 'development') {
    app.use(errorhandler());
}

server.listen(port, function () {
    console.log('Server is listening on port ' + port);
});
