define([
    'lodash'
], function (_) {
    'use strict';

    return {
        name: 'WebApi',
        fn: ['$http', '$q', WebApiFactory]
    };

    function WebApiFactory($http, $q) {

        function getLink(links, rel) {
            return _.find(links, {rel: rel});
        }

        function requestMaker(method, rel, routeOptions) {
            return function (links, reqOptions) {
                var dfd = $q.defer(),
                    link = getLink(links, rel),
                    options = reqOptions || {},
                    url = routeOptions && routeOptions.override || '/api' + link.href;

                $http(_.assign(options, {
                    method: method,
                    url: url
                }))
                .success(function (response) {
                    dfd.resolve(response);
                })
                .error(function (err) {
                    dfd.reject(err);
                });

                return dfd.promise;
            };
        }

        function getMaker(rel, routeOptions) {
            return requestMaker('GET', rel, routeOptions);
        }

        function postMaker(rel, routeOptions) {
            return requestMaker('POST', rel, routeOptions);
        }

        function putMaker(rel, routeOptions) {
            return requestMaker('PUT', rel, routeOptions);
        }

        function deleteMaker(rel, routeOptions) {
            return requestMaker('DELETE', rel, routeOptions);
        }

        return {
            root: null,
            app: {
               getRoot: getMaker(null, {override: '/api'})
            },
            products: {
                getOne: getMaker('self'),
                getAll: getMaker('products'),
                create: postMaker('products'),
                update: putMaker('self'),
                delete: deleteMaker('self'),
                getVariants: getMaker('variants')
            },
            variants: {
                getVariant: getMaker('self'),
                getVariants: getMaker('variants'),
                createVariant: postMaker('variants'),
                update: putMaker('self'),
                deleteVariant: deleteMaker('self')
            },
            orders: {
                getCurrent: getMaker('current_order'),
                getOne: getMaker('self'),
                update: putMaker('self'),
                getAll: getMaker('orders'),
                create: postMaker('orders'),
                delete: deleteMaker('self'),
                getLineItems: getMaker('lineitems'),
                addLineItem: postMaker('lineitems')
            },
            lineitems: {
                update: putMaker('self'),
                delete: deleteMaker('self')
            }
        };
    }
});