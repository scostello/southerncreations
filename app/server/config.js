'use strict';

var path = require('path'),
    _ = require('lodash');

module.exports = {
    'development': {
        srcFolder: path.resolve(__dirname, '../client/src'),
        staticUrl: '/static',
        accessLogPath: '/var/log/node/access.log',
        viewConfig: {
            appName: 'southerncreations',
            title: 'Southern Creations',
            description: 'Southern Creations - Baked Goodies, Hand Crafted Delights, and Custom Apparel',
            baseRoute: '/',
            feature: {
                js: [
                    'https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js'
                ],
                css: [
                    '/static/assets/css/app.css',
                    '/static/assets/css/auth.css'
                ]
            }
        },
        appSettings: {
            'assetHost': '/static/assets/images/'
        },
        'production': {
            srcFolder: path.resolve(__dirname, '../client/dist'),
            vendorFolder: path.resolve(__dirname, '../client/vendor'),
            staticUrl: '/static',
            cookieSecret: 'Ornithorhynchus anatinus'
        }
    }
};