module.exports = function(grunt) {
  // Project Configuration
  grunt.initConfig({
    jshint: {
      options: {
        ignores: []
      },
      all: [
        'Gruntfile.js',
        'public/js/**/*.js',
        'app/*.js'
      ]
    },
    sass: {
      dist: {
        files: {
          'public/css/app.css': 'public/sass/app.scss'
        }
      }
    },
    watch: {
      files: [
        'public/sass/**/*.scss'
      ],
      tasks: ['sass']
    },
    nodemon: {
      dev: {
        script: 'app.js',
        options: {
          nodeArgs: ['--debug'],
          env: {
            PORT: '8383'
          }
        }
      }
    },
    concurrent: {
      dev: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('dev', ['jshint', 'concurrent']);
};
