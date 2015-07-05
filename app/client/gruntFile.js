'use strict';

var paths = {
    js: [
        '*.js',
        'src/app/**/*.js'
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
    grunt.loadNpmTasks('assemble-less');

    grunt.initConfig({
        projectDir: __dirname + '/',
        distDir: '<%= projectDir %>dist/',
        srcDir: '<%= projectDir %>src/',
        vendorDir: '<%= projectDir %>vendor/',
        karma: {
            options: {
                configFile: 'karma.conf.js'
            },
            dev: {
                autowatch: false,
                background: true,
                browsers: ['Chrome']
            }
        },
        watch: {
            js: {
                files: paths.js,
                tasks: ['jshint', 'karma:dev:run']
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
                        'src/vendor/',
                        'src/assets/less/'
                    ],
                    dumpLineNumbers: 'comments',
                    imports: {
                        reference: [
                            'themes/theme.less',
                            'vendor/elements.less',
                            'app/fonts.less'
                        ]
                    }
                },
                files: {
                    'src/assets/css/app.css': [
                        '<%= srcDir %>assets/less/app.less',
                        '<%= srcDir %>app/components/home/less/home.less',
                        '<%= srcDir %>app/components/products/less/products.less'
                    ],
                    'src/assets/css/auth.css': [
                        '<%= srcDir %>assets/less/auth.less',
                        '<%= srcDir %>app/components/login/less/login.less',
                        '<%= srcDir %>app/components/profile/less/*.less'
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