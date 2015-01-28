'use strict';

var paths = {
        js: [
            '*.js',
            'src/**/*.js'
        ],
        less: [
            'src/assets/less/**/*.less',
            'src/app/features/**/*.less'
        ]
    };

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        projectDir: __dirname + '/',
        distDir: '<%= projectDir %>dist/',
        srcDir: '<%= projectDir %>src/',
        vendorDir: '<%= projectDir %>vendor/',
        watch: {
            js: {
                files: paths.js,
                tasks: ['jshint']
            },
            less: {
                files: paths.less,
                tasks: ['less']
            }
        },
        jshint: {
            files: paths.js,
            options: {
                jshintrc: true
            }
        },
        less: {
            dev: {
                options: {
                    paths: ['vendor/'],
                    dumpLineNumbers: 'comments'
                },
                files: {
                    'src/assets/css/app.css': [
                        '<%= srcDir %>assets/less/app.less'
                    ],
                    'src/assets/css/home.css': [
                        '<%= srcDir %>app/features/home/less/home.less'
                    ]
                }
            },
            release: {
                options: {
                    paths: ['vendor/'],
                    cleancss: true
                },
                files: {
                    'dist/assets/css/app.css': [
                        '<%= distDir %>assets/less/app.less'
                    ]
                }
            }
        },
        concurrent: {
            tasks: ['watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    });

    grunt.registerTask('default', [
        'concurrent'
    ]);
};