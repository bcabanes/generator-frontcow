'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            options: {
                includePaths: [
                    <% if (bourbon) { %>'app/bower_components/bourbon/app/assets/stylesheets',<% } %>
                    <% if (fontAwesome) { %>'app/bower_components/font-awesome/scss',<% } %>
                    'app/bower_components/foundation/scss'
                ],
                outputStyle: 'compressed', // 'nested' (default), 'expanded', 'compact', 'compressed'
                sourceComments: 'map',
                // sourceMap: 'app/css/app.css.map' // Not implemented yet see => https://github.com/sindresorhus/grunt-sass/issues/57
            },
            dist: {
                files: {
                    'app/css/main.css': 'app/scss/main.scss'
                }
            }
        },

        jshint: {
            options: {
                reporter: require('jshint-stylish'),
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'app/js/{,*/}*.js'
            ]
        },

        clean: {
            dist: {
                src: ['dist/*']
            },
            tmp: {
                src: ['.tmp']
            }
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd:'app/',
                        src: ['css/**', 'js/**', '!js/modules/**', '!images/**', 'fonts/**', '**/*.html', '**/*.svg', '**/*.ico', '!**/*.scss', '!bower_components/**'],
                        dest: 'dist/'
                    }<% if (fontAwesome) { %>,{
                        expand: true,
                        flatten: true,
                        src: ['app/bower_components/font-awesome/fonts/**'],
                        dest: 'dist/fonts/',
                        filter: 'isFile'
                    }<% } %>
                ]
            }
        },

        useminPrepare: {
            html: 'app/*.html',
            options: {
                staging: '.tmp',
                dest: 'dist'
            }
        },

        usemin: {
            html: ['dist/*.html'],
            css: ['dist/css/*.css'],
            options: {
                dirs: ['dist']
            }
        },

        uglify: {
            options: {
                mangle: true
            }
        },

        watch: {
            grunt: {
                files: ['Gruntfile.js'],
                tasks: ['sass']
            },
            sass: {
                files: 'app/scss/**/*.scss',
                tasks: ['sass']
            },
            livereload: {
                files: ['app/*.html', 'app/js/{,**/}*.js', 'app/css/{,*/}*.css', 'app/images/{,*/}*.{jpg,gif,svg,jpeg,png}'],
                options: {
                    livereload: true
                }
            }
        },

        connect: {
            app: {
                options: {
                    port: 9000,
                    base: 'app/',
                    livereload: true
                }
            },
            dist: {
                options: {
                    port: 9001,
                    base: 'dist/',
                    keepalive: true
                }
            }
        },
        open: {
            app: {
                path: 'http://127.0.0.1:9000/',
                app: 'Google Chrome'
            },
            dist: {
                path: 'http://127.0.0.1:9001/',
                app: 'Google Chrome'
            }
        }

    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-open');

    grunt.registerTask('build', ['sass']);
    grunt.registerTask('default', ['build', 'connect:app', 'open:app', 'watch']);

    grunt.registerTask('livereload', ['connect:app', 'watch:livereload']); // add this commande to just set the server and the livereload
    grunt.registerTask('validate-js', ['jshint']);
    grunt.registerTask('server-dist', ['connect:dist', 'open:dist']); // Not Working?
    grunt.registerTask('publish', ['clean', 'copy:dist', 'useminPrepare', 'concat', 'uglify', 'usemin', 'imagemin', 'clean:tmp']);

};
