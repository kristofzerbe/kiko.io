'use strict';

/**
 * node "./lib/extract_asset_photo_metas.cjs"
 */

const fs = require("fs");
const path = require("path");
const yaml = require('js-yaml');
const { red, yellow, green } = require('chalk');
const exifr = require('exifr');
const geohash = require('ngeohash');

const _currentPath = __dirname;
const _rootPath = path.join(_currentPath, "../");
const _config = yaml.load(fs.readFileSync('./_config.yml', 'utf8'));

const postsDir = path.join(_rootPath, _config.source_dir, "_posts");


(async () => {

  fs.readdirSync(postsDir)
    .filter((entry) => fs.statSync(path.join(postsDir, entry)).isDirectory())
    .forEach(year => {
      fs.readdirSync(path.join(postsDir, year))
        .filter(entry => fs.statSync(path.join(postsDir, year, entry)).isDirectory())
        .forEach(post => {
          let postDir = path.join(postsDir, year, post);
          //console.log(postDir);

          let jpgs = fs.readdirSync(postDir)
            .filter(file => {
              const ext = path.extname(file).toLowerCase();
              return (ext === ".jpg") || (ext === ".jpeg")
            })
            .filter(file => {
              return _config.photo_prefixes.some( p => file.startsWith(p));
            })
            .forEach(file => {
              let fileName = path.basename(file, path.extname(file));
              let jsonFile = path.join(postDir, fileName + ".json");
              let jpgFile = path.join(postDir, file);
              if (fs.existsSync(jsonFile)) {
                //console.log(green(jsonFile));
              } else {

                exifr.parse(jpgFile, { xmp: true, iptc: true }).then(output => {
                  //console.log(red(jpgFile));
                  
                  const custom = {
                    "custom": {
                      "name": fileName,
                      "file": file,
                      "box": "",
                      "featured": {
                        "title": "",
                        "slug": ""
                      },
                      "links": [],
                      "geohash": ""
                    }
                  };

                  if (output && output.DateTimeOriginal) {
                    const meta = { ...custom, ...output };

                    if (meta.latitude && meta.longitude) {
                      meta.custom.geohash = geohash.encode(meta.latitude, meta.longitude);
                    }

                    console.log(green("Meta Data parsed for " + file + " -> " + jsonFile));

                    fs.writeFileSync(jsonFile, JSON.stringify(meta), err => {
                      if (err) { 
                        console.log(red("Meta parsing ERROR for " + jpgFile));
                      }
                    });
                  } else {
                    console.log(red("Meta parsing failure for " + jpgFile));
                  }

                });
              }
            });
          
        })
    })

})();