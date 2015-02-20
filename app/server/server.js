'use strict';

var http = require('http'),
    path = require('path');

// npm modules
var express = require('express'),
    swig = require('swig'),
    morgan = require('morgan'),
    errorhandler = require('errorhandler'),
    bodyParser = require('body-parser'),
    glob = require('glob');

// local modules
var config = require('./config');

require('./lib/db');

// Bootstrap models
var files = glob.sync('**/models/*.js');
files.forEach(function (filePath) {
    require(path.join(__dirname, filePath));
});

// Populate empty DB with dummy data
require('./lib/db/bootstrap');

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

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // to support URL-encoded bodies
require('./lib/middleware/static').addMiddleware(app, envConfig);
//require('./lib/middleware/protectJson').protect(app);

// Adding routes
require('./lib/routes/all').addRoutes(app);         // Application
require('./lib/api/products/routes/products').addRoutes(router); // API


app.use('/api', router);

if (env === 'development') {
    app.use(errorhandler());
}

server.listen(port, function () {
    console.log('Server is listening on port ' + port);
});
