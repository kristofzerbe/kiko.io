module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    gitclone: {
      fontawesome: {
        options: {
          repository: 'https://github.com/FortAwesome/Font-Awesome.git',
          directory: 'themes/landscape/tmp/fontawesome'
        },
      },
      opensans: {
        options: {
          repository: 'https://github.com/webfontkit/open-sans.git',
          directory: 'themes/landscape/tmp/opensans'
        },
      },
      sourcecodepro: {
        options: {
          repository: 'https://github.com/adobe-fonts/source-code-pro.git',
          directory: 'themes/landscape/tmp/sourcecodepro'
        },
      }
    },
    copy: {
      fontawesome: {
        expand: true,
        cwd: 'themes/landscape/tmp/fontawesome/webfonts/',
        src: ['**'],
        dest: 'themes/landscape/source/css/fonts/fontawesome'
      },
      opensans: {
        expand: true,
        cwd: 'themes/landscape/tmp/opensans/fonts/',
        src: ['**'],
        dest: 'themes/landscape/source/css/fonts/opensans'
      },      
      sourcecodepro: {
        expand: true,
        cwd: 'themes/landscape/tmp/sourcecodepro/',
        src: [
          'WOFF2/TTF/*',
          'WOFF/OTF/*',
          'OTF/*',
          'TTF/*'
        ],
        dest: 'themes/landscape/source/css/fonts/sourcecodepro'
      }
    },
    _clean: {
      tmp: ['tmp'],
      fontawesome: ['themes/landscape/source/css/fonts'],
    },
    concat: {
      asset_scripts: {
        options: { separator: '\n' },
        src: [
          'themes/landscape/assets/luminous.js',
          'themes/landscape/assets/AutoTyping.js',
          'themes/landscape/assets/utterances-comment.js',
          'themes/landscape/assets/vanilla-back-to-top.js',
          'themes/landscape/assets/jquery-fullsizable.js'
        ],
        dest: 'themes/landscape/tmp/asset-bundle.js'
      },
      asset_styles: {
        src: [
          'themes/landscape/assets/luminous-basic.css',
          'themes/landscape/assets/jquery-fullsizable.css',
          'themes/landscape/assets/jquery-fullsizable-fontawesome.css'
        ],
        dest: 'themes/landscape/tmp/asset-bundle.css'
      }
    },
    cssmin: {
      dist: {
          files: {
            'themes/landscape/source/css/dist/bundle.min.css': 'themes/landscape/tmp/asset-bundle.css'
          }
      }
    },  
    uglify: {
      options: {
        sourceMap: false
      },
      dist: {
        files: {
          'themes/landscape/source/js/dist/bundle.min.js': 'themes/landscape/tmp/asset-bundle.js'
        }
      }
    },          
    hexo: {
      clean: {
        options: {
          root: '/',
          cliCmd: 'clean'
        }
      },
      generate: {
        options: {
          root: '/',
          cliCmd: 'generate'
        }
      },
    }    
  });

  require('load-grunt-tasks')(grunt);

  grunt.renameTask('clean', '_clean');

  grunt.registerTask('fonts', ['gitclone', 'copy', '_clean:tmp']);  
  grunt.registerTask('clean', ['_clean']);
  grunt.registerTask('bundle', ['concat', 'cssmin', 'uglify', '_clean:tmp']);
  grunt.registerTask('build', ['hexo:clean', 'hexo:generate']);
  grunt.registerTask('default', ['concat', 'cssmin', 'uglify', '_clean:tmp', 'hexo:clean', 'hexo:generate']);
};