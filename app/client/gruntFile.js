'use strict';

var paths = {
    js: [
        '*.js',
        'src/**/*.js'
    ],
    less: [
        'src/assets/**/*.less',
        'src/app/**/*.less'
    ],
    css: [
        'src/assets/**/*.css'
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
                tasks: ['clean:dev', 'less:dev', 'cssmin']
            }
        },
        jshint: {
            files: paths.js,
            options: {
                jshintrc: true
            }
        },
        clean: {
            dev: ['src/assets/css'],
            release: ['dist/assets/css']
        },
        less: {
            dev: {
                options: {
                    paths: [
                        'vendor/',
                        'src/assets/less/'
                    ],
                    dumpLineNumbers: 'comments'
                },
                files: {
                    'src/assets/css/app.css': [
                        '<%= srcDir %>assets/less/app.less',
                        '<%= srcDir %>app/components/home/less/home.less'
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
                        '<%= srcDir %>assets/less/app.less',
                        '<%= srcDir %>app/components/home/less/home.less'
                    ]
                }
            }
        },
        cssmin: {
            dev: {
                files: [{
                    expand: true,
                    cwd: '<%= srcDir %>assets/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= srcDir %>assets/css/',
                    ext: '.min.css'
                }]
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