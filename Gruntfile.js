module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    qunit: {
      files: ['test/**/*.html']
    },
    sweetjs: {
      comet: {
        src: 'src/comet.sjs',
        dest: 'dest/comet.js'
      }
    },
    peg: {
      comet: {
        src: 'src/grammer/parser.pegjs',
        dest: 'dest/parser.js',
        options: { exportVar: 'PEG' }
      }
    },
    coffee : {
      options: {
        bare: true
      },
      compile: {
        files: {
          'dest/tokens.js': 'src/grammer/tokens.coffee'
        }
      }
    },
    concat: {
      assembler: {
        options: {
          banner: '(function(){',
          footer: '})();'
        },
        src: ['dest/ext.min.js', 'dest/tokens.js', 'dest/parser.js', 'src/casl.src.js'],
        dest: 'dest/casl.js'
      }
    },
    bower_concat: {
      all: {
        dest: 'dest/ext.js',
        exclude: [
          'jquery', 'qunit'
        ]
      }
    },
    uglify: {
      bower: {
        files: {
          'dest/ext.min.js': 'dest/ext.js'
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      sweetjs: {
        files: ['src/comet.sjs'],
        tasks: ['build-vm']
      },
      pegjs: {
        files: ['src/grammer/parser.pegjs', 'src/grammer/tokens.coffee'],
        tasks: ['build-parser']
      },
      assembler: {
        files: ['src/casl.src.js', 'src/grammer/tokens.coffee'],
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
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('test', ['qunit']);
  grunt.registerTask('build-parser', ['coffee', 'peg']);
  grunt.registerTask('build-vm', ['sweetjs', 'qunit']);
  grunt.registerTask('build-assembler', ['bower_concat', 'uglify:bower', 'build-parser', 'concat:assembler']);
  grunt.registerTask('default', ['build-vm', 'build-parser', 'build-assembler']);
};
