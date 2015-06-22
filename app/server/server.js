'use strict';

require('dotenv').load();

var http = require('http'),
    path = require('path');

// npm modules
var express = require('express'),
    session = require('express-session'),
    redis = require('redis'),
    redisStore = require('connect-redis')(session),
    swig = require('swig'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    errorhandler = require('errorhandler'),
    glob = require('glob');

var app = express(),
    redisClient = redis.createClient(),
    server = http.createServer(app),
    router = express.Router(),
    config = require('./config');

require('./lib/db')();
glob.sync('**/models/*.js').forEach(function (filePath) {
    require(path.join(__dirname, filePath));
});

//require('./lib/db/bootstrap');

/**
 * Setting app configuration
 */
app.set('config', config[app.get('env')]);
app.set('port', process.env.PORT || 3030);

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
app.use(cookieParser());
app.use(session({
        name: 'sc_sessionid',
        secret: 'yourothersecretcode',
        store: new redisStore({
            host: 'localhost',
            port: 6379,
            client: redisClient
        }),
        saveUninitialized: false, // Don't create session until something stored,
        resave: false             // Don't save session if unmodified
}));
app.use(morgan('dev'));
app.use(bodyParser.json());                       // Support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // Support URL-encoded bodies
require('./lib/middleware/static')(app);          // Add static file supports=

/**
 * Adding custom routes
 */
app.use('/api', router);
require('./lib/api/root/routes/root')(app, router);
require('./lib/api/products/routes/products')(router);
require('./lib/api/settings/routes/settings')(app, router);
require('./lib/api/users/routes/users')(router);
require('./lib/api/orders/routes/orders')(router);
require('./lib/web/routes/web')(app);

if (app.get('env') === 'development') {
    app.use(errorhandler());
}

server.listen(app.get('port'), function () {
    console.log('Server is listening on port ' + app.get('port'));
});
