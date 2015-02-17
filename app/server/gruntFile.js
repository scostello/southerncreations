'use strict';

var paths = {
    js: [
        '*.js',
        'lib/**/*.js'
    ]
};

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        watch: {
            js: {
                files: paths.js,
                tasks: ['jshint']
            }
        },
        jshint: {
            files: paths.js,
            options: {
                jshintrc: true
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                env: {
                    PORT: 3030
                },
                cwd: __dirname,
                ignore: ['node_modules/**'],
                ext: 'js',
                delayTime: 1
            }
        },
        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    });

    grunt.registerTask('default', [
        'concurrent'
    ]);
};