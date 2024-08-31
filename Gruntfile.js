module.exports = function(grunt){
  grunt.loadNpmTasks('grunt-exec');
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    gitclone: {
      lexend: {
        options: {
          repository: 'https://github.com/googlefonts/lexend.git',
          directory: '~temp/lexend'
        },
      },
      opensans: {
        options: {
          repository: 'https://github.com/webfontkit/open-sans',
          directory: '~temp/opensans'
        },
      },
      sourcecodepro: {
        options: {
          repository: 'https://github.com/adobe-fonts/source-code-pro.git',
          directory: '~temp/sourcecodepro'
        },
      }
    },
    _clean: {
      tmp: ['~temp']
    },
    concat: {
      asset_scripts: {
        options: { separator: '\n' },
        src: [
          'node_modules/medium-zoom/dist/medium-zoom.js',
          'node_modules/node-vibrant/dist/vibrant.js',
          'themes/landscape/assets/AutoTyping.js',
          // 'themes/landscape/assets/webmentions.js',
          'themes/landscape/assets/vanilla-back-to-top.js',
          'themes/landscape/assets/downupPopup.js'
        ],
        dest: '~temp/asset-bundle.js'
      },
      asset_styles: {
        src: [
          'node_modules/image-compare-viewer/dist/image-compare-viewer.min.css',
          'node_modules/tiny-slider/dist/tiny-slider.css',
          'themes/landscape/assets/tiny-slider.custom.css',
          'themes/landscape/assets/github-cards.css'
        ],
        dest: '~temp/asset-bundle.css'
      }
    },
    cssmin: {
      dist: {
          files: {
            'themes/landscape/source/css/dist/asset-bundle.min.css': '~temp/asset-bundle.css'
          }
      }
    },  
    uglify: {
      options: {
        sourceMap: false
      },
      dist: {
        files: {
          'themes/landscape/source/js/dist/asset-bundle.min.js': '~temp/asset-bundle.js'
        }
      }
    },
    copy: {
      lexend: {
        expand: true,
        cwd: '~temp/lexend/fonts/lexend',
        src: ['**'],
        dest: 'themes/landscape/source/css/fonts/lexend'
      },
      opensans: {
        expand: true,
        cwd: '~temp/opensans/fonts/',
        src: [
          '*.woff2',
          '*.ttf'
        ],
        dest: 'themes/landscape/source/css/fonts/opensans'
      },
      sourcecodepro: {
        expand: true,
        cwd: '~temp/sourcecodepro/',
        src: [
          'WOFF2/TTF/*',
          'TTF/*'
        ],
        dest: 'themes/landscape/source/css/fonts/sourcecodepro'
      },
      scrolltimeline: {
        expand: true,
        cwd: 'themes/landscape/assets/',
        src: [ 'scroll-timeline.js' ],
        dest: 'themes/landscape/source/js/dist'
      },
      leaflet_css: {
        expand: true,
        cwd: 'node_modules/leaflet/dist/',
        src: [
          'images/*',
          'leaflet.css'
        ],
        dest: 'themes/landscape/source/css/dist'
      },
      leaflet_js: {
        expand: true,
        cwd: 'node_modules/leaflet/dist/',
        src: [ 'leaflet.js' ],
        dest: 'themes/landscape/source/js/dist'
      },
      imagecompare: {
        expand: true,
        cwd: 'node_modules/image-compare-viewer/dist',
        src: [ 'image-compare-viewer.min.js' ],
        dest: 'themes/landscape/source/js/dist'
      },
      lcselect: {
        expand: true,
        cwd: 'node_modules/lc-select',
        src: [ 'lc_select.min.js' ],
        dest: 'themes/landscape/source/js/dist'
      },
      spotlight: {
        expand: true,
        cwd: 'node_modules/spotlight.js/dist',
        src: [ 'spotlight.bundle.js' ],
        dest: 'themes/landscape/source/js/dist'
      },
      tinyslider: {
        expand: true,
        cwd: 'node_modules/tiny-slider/dist/min',
        src: [ 'tiny-slider.js' ],
        dest: 'themes/landscape/source/js/dist'
      },
      qrcodestyling: {
        expand: true,
        cwd: 'node_modules/qr-code-styling/lib',
        src: [ 'qr-code-styling.js' ],
        dest: 'themes/landscape/source/js/dist'
      },
      qrcodestyling_options: {
        expand: true,
        cwd: 'themes/landscape/assets',
        src: [ 'qr-code-styling-options-*.json' ],
        dest: 'themes/landscape/source/js/dist'
      },
      macy: {
        expand: true,
        cwd: 'node_modules/macy/dist',
        src: [ 'macy.js' ],
        dest: 'themes/landscape/source/js/dist'
      },
      colornames: {
        expand: true,
        cwd: 'node_modules/color-name-list/dist',
        src: [ 'colornames.umd.js' ],
        dest: 'themes/landscape/source/js/dist'
      },
      nearestcolor: {
        expand: true,
        cwd: 'node_modules/nearest-color',
        src: [ 'nearestColor.js' ],
        dest: 'themes/landscape/source/js/dist'
      },
      tinycolor: {
        expand: true,
        cwd: 'node_modules/tinycolor2/dist',
        src: [ 'tinycolor-min.js' ],
        dest: 'themes/landscape/source/js/dist'
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