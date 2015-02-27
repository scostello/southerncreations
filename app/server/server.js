'use strict';

var http = require('http'),
    path = require('path'),
    fs = require('fs');

// npm modules
var express = require('express'),
    swig = require('swig'),
    passport = require('passport'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    flash = require('connect-flash'),
    errorhandler = require('errorhandler');

var app = express(),
    server = http.createServer(app),
    port = process.env.PORT || 3030,
    router = express.Router(),
    config = require('./config');

/**
 * Setting app configuration
 */
app.set('config', config[app.get('env')]);

/**
 * Setting view configuration
 */
app.set('view cache', false);
swig.setDefaults({
    cache: app.get('env') !== 'development',
    loader: swig.loaders.fs(path.join(app.get('config').srcFolder, '/views/layouts'))
});
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(app.get('config').srcFolder, '/views/layouts/'));


/**
 * Adding middleware to the app
 */
require('./lib/auth/config/passport')(passport);
app.use(morgan('dev', {
    stream: fs.createWriteStream(app.get('config').accessLogPath)
}));
app.use(cookieParser());                          // Add ability to parse session cookies
app.use(bodyParser.json());                       // Support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // Support URL-encoded bodies
require('./lib/middleware/static')(app);          // Add static file supports=

/**
 * Session support which is required for passport
 */
app.use(session({
    secret: app.get('config').cookieSecret,
    proxy: true
}));
app.use(passport.initialize()); // Initialize passport
app.use(passport.session());    // Persistent login sessions
app.use(flash());               // Use connect-flash for flash messages stored in session

/**
 * Adding custom routes
 */
require('./lib/web/routes/web')(app); // Application
require('./lib/auth/routes/auth')(app, passport);
require('./lib/api/products/routes/products').addRoutes(router); // API

app.use('/api', router);

if (app.get('env') === 'development') {
    app.use(errorhandler());
}

server.listen(port, function () {
    console.log('Server is listening on port ' + port);
});
