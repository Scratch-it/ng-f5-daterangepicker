module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: ['src/ng-f5-daterangepicker.js', 'test/**/*.js']
    },

    karma: {
      unit: {
        options: {
          basePath: './',
          frameworks: ['jasmine'],
          browsers: ['PhantomJS'],
          autoWatch: true,
          singleRun: true,
          files: [
            'src/components/jquery/jquery.js',
            'src/components/angular/angular.js',
            'src/components/angular-mocks/angular-mocks.js',
            'src/components/momentjs/min/moment.min.js',
            'src/components/foundation-daterangepicker/daterangepicker.js',
            'src/ng-f5-daterangepicker.js',
            'test/**/*.js']
        }
      }
    },

    uglify: {
       options: {
          preserveComments: 'some',
          sourceMap: 'dist/ng-f5-daterangepicker.min.js.map',
          sourceMappingURL: 'ng-f5-daterangepicker.min.js.map',
          report: 'min'
       },
       dist: {
          files: {
             'dist/ng-f5-daterangepicker.min.js': ['src/ng-f5-daterangepicker.js']
          }
       }
     }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['jshint', 'karma']);
};
