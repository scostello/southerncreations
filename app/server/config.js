var path = require('path');

module.exports = {
    'development': {
        server: {
            listenPort: 3030,
            srcFolder: path.resolve(__dirname, '../client/src'),
            vendorFolder: path.resolve(__dirname, '../client/vendor'),
            staticUrl: '/static',
            cookieSecret: 'a mock cookie for security'
        }
    },
    'production': {
        server: {
            listenPort: 3030,
            srcFolder: path.resolve(__dirname, '../client/dist'),
            vendorFolder: path.resolve(__dirname, '../client/vendor'),
            staticUrl: '/static',
            cookieSecret: 'Ornithorhynchus anatinus'
        }
    }
};