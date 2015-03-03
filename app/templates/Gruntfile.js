/* global require */
'use strict';

/**
 * GRUNTFILE
 */
module.exports = function(grunt) {

  /**
  * Load grunt tasks automatically
  * Read the dependencies/devDependencies/peerDependencies in the package.json
  * and load grunt tasks that match the provided patterns.
  */
  require('load-grunt-tasks')(grunt, {
    // pattern: 'grunt-*',
    config: 'package.json',
    scope: ['dependencies', 'devDependencies']
  });

  /**
   * Time how long tasks take.
   * Can help when optimizing build times
   */
  require('time-grunt')(grunt);

  /**
   * Define the configuration for all tasks
   */
  grunt.initConfig({

    /**
     * Watch files for changes and runs tasks based on the changed files
     * @type {Object}
     */
    watch: {
      options: {
        debounceDelay: 200
      },
      sass: {
        files: 'app/scss/**/*.scss',
        tasks: ['sass:dist']
      }
    },

    /**
     * Grunt server settings
     */
    browserSync: {
      dev: {
        'options': {
          'port': 4000,
          'watchTask': true,
          'injectChanges': false,
          'server': {
            'baseDir': './app',
            'middleware': [
              require('connect-history-api-fallback')
            ]
          },
          'files': [
            'app/js/**/*',
            'app/images/**/*',
            'app/*.html',
            'app/css/**/*'
          ]
        }
      },
      dist: {
        'options': {
          'port': 5000,
          'watchTask': true,
          'injectChanges': false,
          'server': {
            'baseDir': './dist',
            'middleware': [
              require('connect-history-api-fallback')
            ]
          },
          'files': [
            'app/*.html',
          ]
        }
      }
    },

    /**
     * Empties folders to start fresh
     */
     clean: {
       dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            'dist/*',
            '!dist/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    /**
     * C LIBSASS
     * Compiles Sass to CSS and generates necessary files if requested
     * @type {Object}
     */
    sass: {
      options: {
        includePaths: [
          <% if (bourbon) { %>'app/bower_components/bourbon/dist',<% } %>
          <% if (fontAwesome) { %>'app/bower_components/font-awesome/scss',<% } %>
          <% if (foundation) { %>'app/bower_components/foundation/scss' <% } else { %> 'app/bower_components/modularized-normalize-scss' <% }%>
        ],
        outputStyle: 'compressed', // 'nested' (default), 'expanded', 'compact', 'compressed'
        sourceMap: true
      },
      dist: {
        files: {
          'app/css/main.css': 'app/scss/main.scss'
        }
      }
    },

    /**
     * The following *-min tasks produce minified files in the dist folder
     */
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/medias/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: 'dist/medias/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/medias/images',
          src: '{,*/}*.svg',
          dest: 'dist/medias/images'
        }]
      }
    },

    /**
     * USEMIN PREPARE
     * @type {Object}
     */
    useminPrepare: {
      html: 'app/index.html',
      options: {
        staging: '.tmp',
        dest: 'dist'
      }
    },
    usemin: {
      html: ['dist/{,*/}*.html'],
      css: ['dist/css/{,*/}*.css'],
      options: {
        dirs: ['dist']
      }
    },

    /**
     * Concat (use by usemin/useminPrepare)
     * @type {Object}
     */
    concat: {
      options: {
        separator: ';',
        sourceMap: false,
        sourceMapName: undefined,
        sourceMapStyle: 'embed'
      }
    },

    /**
     * UglifyJS (use by usemin/useminPrepare)
     * @type {Object}
     */
    uglify: {
      options: {
        beautify: false,
        mangle: true
      }
    },

    /**
     * Copies remaining files to places other tasks can use
     * fontawesome: copy the fontawesome font into the dist directory
     * dist: simple frontend distribution
     * @type {Object}
     */
    copy: {
      <% if (fontAwesome) { %>
      fontawesome: {
        files:[
          {
            cwd:'app/bower_components/font-awesome/fonts/',
            expand: true,
            flatten: true,
            src: '**',
            dest: 'app/fonts/'
          }
        ]
      },
      <% } %>
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: 'app',    // From
            dest: 'dist',  // To
            src: [
              '*.{ico,png,txt}',
              '.htaccess',
              //'medias/images/{,*/}*.{jpg,gif,ico,png,txt,webp,svg}',
              'medias/{,*/}*.*',
              '{,*/}*.html',
              'js/{,*/}*.*', // Need to load entities
              '!js/modules', // No need to copy modules
              'css/{,*/}*.*',
              'fonts/{,*/}*.*'
            ]
          }
          <% if (fontAwesome) { %>,{
            expand: true,
            flatten: true,
            src: ['app/bower_components/font-awesome/fonts/**'],
            dest: 'dist/fonts/',
            filter: 'isFile'
          }
          <% } %>
        ]
      }
    },

    /**
     * jshint
     * Check the integrity design of code
     * @type {Object}
     */
    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        jshintrc: '.jshintrc'
      },
      all: [
        '!Gruntfile.js',
        'app/js/{,*/}*.js'
      ]
    }

  });// END grunt.initConfig

  /**
   * SERVER TASK
   * Initializing the watch, copying styles and start compass.
   * Lunch the local server and open the app in the browser.
   */
  grunt.registerTask('server', function (target) {

    // $ grunt server:dist
    if(target === 'dist') {
      return grunt.task.run(['build', 'browserSync:dist']);
    }

    grunt.task.run([
      'clean:server',
      <% if (fontAwesome) { %>'copy:fontawesome',<% } %>
      'browserSync:server',
      'watch'
    ]);
  });

  /**
   * BUILD TASK
   */
  grunt.registerTask('build', [
    'clean:dist',
    'copy:dist',
    'useminPrepare',
    'usemin',
    'concat',
    'uglify',
    'imagemin',
    'clean:server'
  ]);

  /**
   * SCAN-JS
   * Scan the js with JSHINT
   */
  grunt.registerTask('scan-js', ['jshint']);

};
