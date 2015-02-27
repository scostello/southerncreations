'use strict';

var mongoose = require('mongoose');

exports.mongoose = mongoose;

// Configure for possible deployment
var uristring = process.env.MONGOLAB_URI || 'mongodb://webuser:webpassword@ds047911.mongolab.com:47911/southerncreations' || 'mongodb://localhost/southerncreations';

var mongoOptions = { db: { safe: true } };

// Connect to Database
mongoose.connect(uristring, mongoOptions, function (err, res) {
    if (err) {
        console.log ('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log ('Successfully connected to: ' + uristring);
    }
});