var path = require('path');

module.exports = {
    'development': {
        srcFolder: path.resolve(__dirname, '../client/src'),
        vendorFolder: path.resolve(__dirname, '../client/vendor'),
        staticUrl: '/static',
        cookieSecret: 'a mock cookie for security',
        accessLogPath: '/var/log/node/access.log'
    },
    'production': {
        srcFolder: path.resolve(__dirname, '../client/dist'),
        vendorFolder: path.resolve(__dirname, '../client/vendor'),
        staticUrl: '/static',
        cookieSecret: 'Ornithorhynchus anatinus'
    }
};