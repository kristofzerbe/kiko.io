'use strict';

/**
 * node "./lib/once/_once_process_meta_geohash.cjs"
 */

const { red } = require('chalk');

const fs = require("fs");
const path = require("path");
const geohash = require('ngeohash');

const metaFolder = "../../static/photos/meta";
const poolFolder = "../../static/pool";
const shedFolder = "../../static/shed";

const _currentPath = __dirname;

let _metaFolder = path.join(_currentPath, metaFolder);;
let _poolFolder = path.join(_currentPath, poolFolder);
let _shedFolder = path.join(_currentPath, shedFolder);


//** PHOTOS meta */
// fs.readdirSync(_metaFolder)
//   .forEach((file) => {
//     processMeta(path.join(_metaFolder, file));
//   });

/** POOL meta */
// fs.readdirSync(_poolFolder)
//   .map(f => { return path.join(_poolFolder, f, "meta.json"); })
//   .forEach((file) => {
//     processMeta(file);
//   });

/** SHED meta */
// fs.readdirSync(_shedFolder)
//   .map(f => { return path.join(_shedFolder, f, "meta.json"); })
//   .forEach((file) => {
//     processMeta(file);
//   });

/** ------------------------------------------------------------------- */

function processMeta(metaFile) {

  if (!fs.existsSync(metaFile)) return;

  console.log(metaFile);

  let metaContent = fs.readFileSync(metaFile);
  let meta = JSON.parse(metaContent);

  if (!meta.latitude && !meta.longitude) {
    console.log(" > no coordinates");
  } else {
    //console.log(" > " + meta.latitude + " / " + meta.longitude);

    if (!meta.custom?.geohash) {
      meta.custom.geohash = geohash.encode(meta.latitude, meta.longitude);

      fs.writeFile(metaFile, JSON.stringify(meta), err => {
        if (err) { console.error(err); }
      });
      console.log(" + " + meta.custom.geohash);      
    }
  }
  
}