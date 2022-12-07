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
      },
      imagecompare: {
        expand: true,
        cwd: 'themes/landscape/assets/image-compare-viewer',
        src: [
          'image-compare-viewer.min.js',
          'image-compare-viewer.min.js.map'
        ],
        dest: 'themes/landscape/source/js/dist'
      },
      lcselect: {
        expand: true,
        cwd: 'themes/landscape/assets/lc-select',
        src: [
          'lc_select.min.js'
        ],
        dest: 'themes/landscape/source/js/dist'
      },
      spotlight: {
        expand: true,
        cwd: 'themes/landscape/assets/spotlight',
        src: [
          'spotlight.bundle.js'
        ],
        dest: 'themes/landscape/source/js/dist'
      },
      tinyslider: {
        expand: true,
        cwd: 'themes/landscape/assets/tiny-slider',
        src: [
          'tiny-slider.min.js',
          'tiny-slider.min.js.map'
        ],
        dest: 'themes/landscape/source/js/dist'
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
          'themes/landscape/assets/AutoTyping.js',
          'themes/landscape/assets/utterances-comment.js',
          'themes/landscape/assets/webmentions.js',
          'themes/landscape/assets/vanilla-back-to-top.js',
          'themes/landscape/assets/medium-zoom.js'
        ],
        dest: 'themes/landscape/tmp/asset-bundle.js'
      },
      asset_styles: {
        src: [
          'themes/landscape/assets/lc-select/lc_select.css',
          'themes/landscape/assets/image-compare-viewer/image-compare-viewer.css',
          'themes/landscape/assets/tiny-slider/tiny-slider.css',
          'themes/landscape/assets/github-cards.css'
        ],
        dest: 'themes/landscape/tmp/asset-bundle.css'
      }
    },
    uglify: {
      options: {
        sourceMap: false
      },
      dist: {
        files: {
          'themes/landscape/source/js/dist/bundle.min.js': 'themes/landscape/tmp/asset-bundle.js',
          'themes/landscape/assets/lc-select/lc_select.min.js': 'themes/landscape/assets/lc-select/lc_select.js'
        }
      }
    },
    cssmin: {
      dist: {
          files: {
            'themes/landscape/source/css/dist/bundle.min.css': 'themes/landscape/tmp/asset-bundle.css'
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
      }
    }    
  });

  require('load-grunt-tasks')(grunt);

  grunt.renameTask('clean', '_clean');

  grunt.registerTask('fonts', ['gitclone', 'copy', '_clean:tmp']);  
  grunt.registerTask('default', ['concat', 'cssmin', 'uglify', 'copy', '_clean:tmp']);
  grunt.registerTask('all', ['concat', 'cssmin', 'uglify', 'copy', '_clean:tmp', 'hexo:clean', 'hexo:generate']);
  grunt.registerTask('complete', ['gitclone', 'concat', 'cssmin', 'uglify', 'copy', '_clean:tmp', 'hexo:clean', 'hexo:generate']);
  grunt.registerTask('build', ['hexo:clean', 'hexo:generate']);
  grunt.registerTask('generate', ['hexo:generate']);
};