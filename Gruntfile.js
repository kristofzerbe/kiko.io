module.exports = function(grunt){
  grunt.loadNpmTasks('grunt-exec');
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    gitclone: {
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
      },
      macy: {
        expand: true,
        cwd: 'themes/landscape/assets/macy',
        src: [
          'macy.js'
        ],
        dest: 'themes/landscape/source/js/dist'
      },
      qrcodestyling: {
        expand: true,
        cwd: 'themes/landscape/assets/qr-code-styling',
        src: [
          'qr-code-styling.js',
          'qr-code-styling-options-*.json'
        ],
        dest: 'themes/landscape/source/js/dist'
      }
    },
    _clean: {
      tmp: ['tmp']
    },
    concat: {
      asset_scripts: {
        options: { separator: '\n' },
        src: [
          'themes/landscape/assets/AutoTyping.js',
          'themes/landscape/assets/utterances-comment.js',
          'themes/landscape/assets/webmentions.js',
          'themes/landscape/assets/vanilla-back-to-top.js',
          'themes/landscape/assets/medium-zoom.js',
          'themes/landscape/assets/downupPopup/downupPopup.js'
        ],
        dest: 'themes/landscape/tmp/asset-bundle.js'
      },
      asset_styles: {
        src: [
          'themes/landscape/assets/lc-select/lc_select.css',
          'themes/landscape/assets/image-compare-viewer/image-compare-viewer.css',
          'themes/landscape/assets/tiny-slider/tiny-slider.css',
          'themes/landscape/assets/github-cards.css',
          'themes/landscape/assets/downupPopup/downupPopup.css'
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
      },
      server: {
        options: {
          root: '/',
          cliCmd: 'server'
        }
      }
    },
    exec: {
      pagefind: {
        command: 'npx pagefind',
        stdout: true
      }
    }    
  });

  require('load-grunt-tasks')(grunt);

  grunt.renameTask('clean', '_clean');

  grunt.registerTask('fonts', ['gitclone', 'copy', '_clean:tmp']);  
  grunt.registerTask('styles', ['concat:asset_styles', 'cssmin']);
  grunt.registerTask('scripts', ['concat:asset_scripts', 'uglify']);
  grunt.registerTask('default', ['concat', 'cssmin', 'uglify', 'copy', '_clean:tmp']);
  grunt.registerTask('complete', ['gitclone', 'concat', 'cssmin', 'uglify', 'copy', '_clean:tmp']);
};