module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    qunit: {
      files: ['test/**/*.html']
    },
    sweetjs: {
      comet: {
        src: 'comet.sjs'
      }
    },
    peg: {
      comet: {
        src: 'grammer/parser.pegjs',
        dest: 'parser.js',
        options: { exportVar: 'PEG' }
      }
    },
    coffee : {
      options: {
        bare: true
      },
      compile: {
        files: {
          'grammer/tokens.js': 'grammer/tokens.coffee'
        }
      }
    },
    concat: {
      assembler: {
        options: {
          banner: '(function(){',
          footer: '})();'
        },
        src: ['ext.js', 'grammer/tokens.js', 'parser.js', 'casl.src.js'],
        dest: 'casl.js'
      }
    },
    bower_concat: {
      all: {
        dest: 'ext.js',
        exclude: [
          'jquery'
        ]
      }
    },
    watch: {
      options: {
        livereload: true
      },
      sweetjs: {
        files: ['comet.sjs'],
        tasks: ['build-vm']
      },
      pegjs: {
        files: ['grammer/parser.pegjs', 'grammer/tokens.coffee'],
        tasks: ['build-parser']
      },
      assembler: {
        files: ['casl.src.js', 'grammer/tokens.coffee'],
        tasks: ['build-assembler']
      }
    },
    connect: {
      server: {
        options: {
          port: 8080
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sweet.js');
  grunt.loadNpmTasks('grunt-peg');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-bower-concat');

  grunt.registerTask('test', ['qunit']);
  grunt.registerTask('build-parser', ['coffee', 'peg']);
  grunt.registerTask('build-vm', ['sweetjs', 'qunit']);
  grunt.registerTask('build-assembler', ['build-parser', 'concat:assembler']);
  grunt.registerTask('default', ['bower_concat', 'build-vm', 'build-parser', 'build-assembler']);
};
