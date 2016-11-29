'use strict';

module.exports = function(grunt) {

  grunt.log.writeln('Hello Dennis...');

  const watchFiles = {
    serverJS: ['gruntfile.js', 'app.js']
  };

  const env = grunt.file.readJSON('.env');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: {
        src: watchFiles.serverJS,
        options: {
          jshintrc: true
        }
      }
    },
    watch: {
      serverJS: {
        files: watchFiles.serverJS,
        tasks: ['jshint']
      }
    },
    nodemon: {
      dev: {
        script: 'app.js',
        options: {
          nodeArgs: ['--debug'],
          env: {
            PORT: '3978'
          }
        }
      }
    },
    concurrent: {
      default: ['nodemon', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    } 
  });

  // Load NPM tasks
  require('load-grunt-tasks')(grunt);

  // Making grunt default to force in order not to break the project.
  //grunt.option('force', true);

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'concurrent:default']);

};