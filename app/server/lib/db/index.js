'use strict';

module.exports = function () {
    var mongoose = require('mongoose'),
        Promise = require('bluebird'),
        uristring = process.env.MONGOLAB_URI || 'mongodb://webuser:webpassword@ds047911.mongolab.com:47911/southerncreations' || 'mongodb://localhost/southerncreations',
        mongoOptions = { db: { safe: true } };

    Promise.promisifyAll(mongoose);

    // Connect to Database
    mongoose.connect(uristring, mongoOptions, function (err, res) {
        if (err) {
            console.log ('ERROR connecting to: ' + uristring + '. ' + err);
        } else {
            console.log ('Successfully connected to: ' + uristring);
        }
    });
};