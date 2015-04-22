'use strict';

module.exports = function (app, router) {
    var config = app.get('config');

    router.route('/settings')
        .get(function (req, res) {
            res.status(200).json(config.appSettings);
        });
};
