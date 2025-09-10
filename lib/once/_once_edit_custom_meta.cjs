'use strict';

/**
 * Edits all photo meta.json files to have the same structure as /templates/meta-custom.json
 * 
 * node "./lib/once/_once_edit_custom_meta.cjs"
 */

const fs = require("fs");
const path = require("path");
const yaml = require('js-yaml');

const _currentPath = __dirname;
const _rootPath = path.join(_currentPath, "../../");
//console.log(_rootPath);
let _config = yaml.load(fs.readFileSync('./_config.yml', 'utf8'));

const photoMetaDir = path.join(_rootPath, _config.static_dir, _config.photo_dir, "meta");
const poolDir = path.join(_rootPath, _config.static_dir, _config.pool_dir);
const shedDir = path.join(_rootPath, _config.static_dir, _config.shed_dir);
const reserveDir = path.join(_rootPath, _config.static_dir, _config.reserve_dir);

const photoMetas = fs.readdirSync(photoMetaDir)
  .map(f => { return path.join(photoMetaDir, f); }
);
const poolMetas = fs.readdirSync(poolDir)
  .map(f => { return path.join(poolDir, f, "meta.json"); }
);
const shedMetas = fs.readdirSync(shedDir)
  .map(f => { return path.join(shedDir, f, "meta.json"); }
);
const reserveMetas = fs.readdirSync(reserveDir)
  .map(f => { return path.join(reserveDir, f, "meta.json"); }
);

const metas = [...photoMetas, ...poolMetas, ...shedMetas, ...reserveMetas];
//console.log(metas);

metas.forEach((file) => {
  //console.log(file);
  let metaJson = fs.readFileSync(file);
  let meta = JSON.parse(metaJson);

  // 25.09-10 FIX MISSING NAME & FILE
  if (!meta.custom.name || meta.custom.name === "") {
    console.log("missing NAME @ " + file);
  }
  if (!meta.custom.file || meta.custom.file === "") {
    console.log("missing FILE @ " + file);
  }

  // 25-09-09 ADD BOX
  // if (!meta.custom.hasOwnProperty("box")) {
  //   console.log("missing @ " + file);
    
  //   //meta.custom.box = "";
  //   const newCustom = {
  //     "name": meta.custom.name,
  //     "file": meta.custom.file ?? meta.custom.name + ".jpg",
  //     "box": "", //NEW
  //     "featured": meta.custom.featured,
  //     "links": meta.custom.links
  //   }
  //   meta.custom = newCustom;

  //   fs.writeFile(file, JSON.stringify(meta), err => {
  //     if (err) { console.error(err); }
  //   });    
  // } else {
  //   console.log("!!! @ " + file);
  // }

});