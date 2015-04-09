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
      parser: {
        src: ['grammer/intro.js', 'grammer/outro.js', 'grammer/parser.src.pegjs'],
        dest: 'grammer/parser.pegjs'
      },
      assembler: {
        src: ['intro.js', 'underscore-min.js', 'grammer/tokens.js', 'parser.js', 'casl.src.js', 'outro.js'],
        dest: 'casl.js'
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
        files: ['grammer/parser.src.pegjs', 'grammer/tokens.coffee'],
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

  grunt.registerTask('test', ['qunit']);
  grunt.registerTask('build-parser', ['coffee', 'concat:parser', 'peg']);
  grunt.registerTask('build-vm', ['sweetjs', 'qunit']);
  grunt.registerTask('build-assembler', ['build-parser', 'concat:assembler']);
  grunt.registerTask('default', ['build-vm', 'build-parser', 'build-assembler']);
};
