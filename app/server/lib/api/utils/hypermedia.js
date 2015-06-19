'use strict';

var path = require('path');

exports.userHypermedis = function (user) {
    var hypermedia = {},
        userBase = path.join('/users', user._id);

    hypermedia.links = [
        {
            rel: 'self',
            href: userBase,
            contentType: 'application/sc.users+json'
        },
        {
            rel: 'shoppingCart',
            href: path.join(userBase, 'shoppingcart'),
            contentType: 'application/sc.users+json'
        }
    ];

    hypermedia.payload = user;

    return hypermedia;
};