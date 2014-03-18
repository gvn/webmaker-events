module.exports = function (grunt) {

  grunt.initConfig({
    less: {
      development: {
        files: {
          'app/compiled/app.min.css': 'app/less/app.less'
        },
        options: {
          sourceMap: true,
          sourceMapBasepath: 'app',
          sourceMapRootpath: '/'
        }
      },
      production: {
        files: {
          'app/compiled/app.min.css': 'app/less/app.less'
        }
      }
    },
    watch: {
      less: {
        files: ['app/less/**/*.less', 'bower.json'],
        tasks: ['less:development']
      },
      server: {
        files: ['server/**/*', 'package.json'],
        tasks: ['shell:runServer']
      }
    },
    shell: {
      runServer: {
        options: {
          async: true
        },
        command: 'node server/server.js'
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'app/js/**/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    jsbeautifier: {
      modify: {
        src: ['Gruntfile.js', 'app/js/**/*.js'],
        options: {
          config: '.jsbeautifyrc'
        }
      },
      validate: {
        src: ['Gruntfile.js', 'app/js/**/*.js'],
        options: {
          mode: 'VERIFY_ONLY',
          config: '.jsbeautifyrc'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-shell-spawn');
  grunt.loadNpmTasks('grunt-jsbeautifier');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['less:development', 'shell:runServer', 'watch']);

  // Clean code before a commit
  grunt.registerTask('clean', ['jsbeautifier:modify', 'jshint']);

  // Validate code (read only)
  grunt.registerTask('validate', ['jsbeautifier:validate', 'jshint']);

  // Heroku
  grunt.registerTask('build', ['less:production']);

};
