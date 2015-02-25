(function () {
    'use strict';

    var plan = require('flightplan'),
        envs = {
            dev: 'dev',
            prod: 'prod'
        };

    plan.target(envs.dev, {
        host: '192.168.50.50',
        username: 'vagrant'
    });

    plan.local(['create', 'boot'], function (transport) {
        var target = plan.runtime.target;
        if (target === envs.dev) {
            transport.exec('vagrant up');
        }
    });

    plan.local('destroy', function (transport) {
        var target = plan.runtime.target;
        if (target === envs.dev) {
            transport.exec('vagrant destroy -f');
        }
    });

    plan.local('provision', function (transport) {
        var target = plan.runtime.target;
        if (target === envs.dev) {
            transport.exec('vagrant provision');
        }
    });

}());