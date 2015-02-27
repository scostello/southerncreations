(function () {
    'use strict';

    var plan = require('flightplan'),
        envs = {
            dev: 'dev',
            prod: 'prod'
        };

    plan.target(envs.dev, {
        host: '192.168.50.50',
        username: 'vagrant',
        privateKey: './.vagrant/machines/southerncreations/virtualbox/private_key'
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

    plan.remote('buildnode', function (transport) {
        transport.with('cd /opt/southerncreations/config/dockerimages/node/', function () {
            transport.sudo('docker build -t scostello/node .');
        });
    });

    plan.remote('runnode', function (transport) {
        transport.sudo('docker run -d -p 3030:3030 -v /vagrant/var/log/node:/var/log/node -v /opt/southerncreations/app:/var/www/app scostello/node');
    });

    plan.remote('dockerps', function (transport) {
        transport.sudo('docker ps');
    });

}());