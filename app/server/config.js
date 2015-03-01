'use strict';

var path = require('path'),
    _ = require('lodash');

module.exports = {
    'development': {
        srcFolder: path.resolve(__dirname, '../client/src'),
        vendorFolder: path.resolve(__dirname, '../client/vendor'),
        staticUrl: '/static',
        cookieSecret: 'a mock cookie for security',
        accessLogPath: '/var/log/node/access.log',
        getViewConfig: function (view) {
            var config = {
                appName: 'southerncreations',
                title: 'Southern Creations',
                description: 'Southern Creations - Baked Goodies, Hand Crafted Delights, and Custom Apparel',
                baseRoute: '/',
                feature: {
                    css: [
                        '/static/assets/css/app.css'
                    ]
                }
            };

            switch (view) {
                case 'login':
                    config = _.assign(config, {
                        title: 'Login - Southern Creations',
                        description: 'Southern Creations - Login'
                    });
                    break;
            }

            return config;
        },
        'production': {
            srcFolder: path.resolve(__dirname, '../client/dist'),
            vendorFolder: path.resolve(__dirname, '../client/vendor'),
            staticUrl: '/static',
            cookieSecret: 'Ornithorhynchus anatinus'
        }
    }
};