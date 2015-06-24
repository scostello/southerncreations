'use strict';

var path = require('path'),
    _ = require('lodash');

exports.rootHypermedia = function (session, root) {
    var hypermedia = {},
        rootBase = '/';

    hypermedia.links = [
        {
            rel: 'self',
            href: rootBase,
            contentType: 'application/sc+json'
        },
        {
            rel: 'products',
            href: path.join(rootBase, 'products'),
            contentType: 'application/sc+json'
        },
        {
            rel: 'orders',
            href: path.join(rootBase, 'orders'),
            contentType: 'application/sc+json'
        },
        {
            rel: 'testimonials',
            href: path.join(rootBase, 'testimonials'),
            contentType: 'application/sc+json'
        },
        {
            rel: 'users',
            href: path.join(rootBase, 'users'),
            contentType: 'application/sc+json'
        }
    ];

    if (session.sc_currentOrderNumber && session.sc_currentOrderToken) {
        hypermedia.links.push({
            rel: 'current_order',
            href: path.join(rootBase, 'orders', session.sc_currentOrderNumber, '?order_token=', session.sc_currentOrderToken),
            contentType: 'application/sc+json'
        });
    }

    hypermedia.payload = root;

    return hypermedia;
};

exports.userHypermedis = function (user) {
    var hypermedia = {},
        userBase = path.join('', 'users', user._id);

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

exports.productHypermedia = function (product) {
    var hypermedia = {},
        productBase = path.join('/', 'products', product._id.toString()),
        productBaseSlug = path.join('/', 'products', product.slug);

    hypermedia.links = [
        {
            rel: 'self',
            href: productBase,
            contentType: 'application/sc.products+json'
        },
        {
            rel: 'self_slug',
            href: productBaseSlug,
            contentType: 'application/sc.products+json'
        },
        {
            rel: 'variants',
            href: path.join(productBase, 'variants'),
            contentType: 'application/sc.products+json'
        }
    ];

    hypermedia.payload = product;

    return hypermedia;
};

exports.variantHypermedia = function (productId, variant) {
    var hypermedia = {},
        variantBase = path.join('', 'products', productId.toString(), 'variants', variant._id.toString()),
        variantBaseSlug = path.join('', 'products', productId.toString(), 'variants', variant.slug.toString()),
        variantBaseSku = path.join('', 'products', productId.toString(), 'variants', variant.sku.toString());

    hypermedia.links = [
        {
            rel: 'self',
            href: variantBase,
            contentType: 'application/sc.product-variants+json'
        },
        {
            rel: 'self_slug',
            href: variantBaseSlug,
            contentType: 'application/sc.product-variants+json'
        },
        {
            rel: 'self_sku',
            href: variantBaseSku,
            contentType: 'application/sc.product-variants+json'
        }
    ];

    hypermedia.payload = variant;

    return hypermedia;
};