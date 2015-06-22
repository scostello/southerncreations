'use strict';

var _ = require('lodash'),
    hypermedia = require('../../utils/hypermedia.js');

module.exports = function (app, router) {
    var config = app.get('config');

    router.route('/')
        .get(function (req, res) {
            var session = req.session,
                rootPayload = {
                name: 'Southern Creations API',
                version: 1,
                settings: _.assign(config.appSettings, {
                    menuitems: [
                        {
                            name: 'home',
                            state: 'app.home'
                        },
                        {
                            name: 'menu',
                            state: 'app.menu'
                        },
                        {
                            name: 'catering',
                            state: 'app.catering'
                        },
                        {
                            name: 'about',
                            state: 'app.about'
                        },
                        {
                            name: 'contact',
                            state: 'app.contact'
                        }
                    ],
                    cookieKeys: {
                        orderNumber: 'sc_currentOrderNumber',
                        orderToken: 'sc_currentOrderToken'
                    }
                })
            };

            return res.status(200).json(hypermedia.rootHypermedia(session, rootPayload));
        });
};