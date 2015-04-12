'use strict';

module.exports = function (app) {
    var viewConfig = app.get('config').viewConfig;
    app.get('/*', function (req, res) {
        res.render('index', viewConfig);
    });
};