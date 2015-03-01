'use strict';

module.exports = function (app) {
    var viewConfig = app.get('config').getViewConfig('index');

    app.all('*', function (req, res) {

        res.render('index', viewConfig);
    });
};