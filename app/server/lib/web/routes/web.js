'use strict';

module.exports = function (app) {
    var viewConfig = app.get('config').getViewConfig('index');

    console.log('In web');

    app.get('/*', function (req, res) {
        res.render('index', viewConfig);
    });
};