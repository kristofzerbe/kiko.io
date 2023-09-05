'use strict';

/**
 * node "./lib/_once_process_meta_original.js"
 */

const { red } = require('chalk');

const fs = require("fs");
const path = require("path");

const exifr = require('exifr');
const originalFolder = "../photos_original/temp";
const poolFolder = "../static/pool";
const metaFolder = "../static/photos/meta";

const _currentPath = __dirname;

let _originalFolder = path.join(_currentPath, originalFolder);
let _poolFolder = path.join(_currentPath, poolFolder);
let _metaFolder = path.join(_currentPath, metaFolder);;

const orgFiles = fs.readdirSync(_originalFolder);

// return; //DONT RUN AGAIN!

const jpgFiles = orgFiles
  .filter(file => {
    return path.extname(file).toLowerCase() === ".jpg";
  })
  .sort();

if (jpgFiles.length === 0) return;

jpgFiles.forEach((file) => {

  const imgFile = path.join(_originalFolder, file);

  const folder = file.replace(path.extname(file), '');

  let metaFile;

  const existingPoolFolder = path.join(_poolFolder, folder);
  if (fs.existsSync(existingPoolFolder)) {
    metaFile = path.join(existingPoolFolder, "meta.json");
  } else {
    metaFile = path.join(_metaFolder, folder + ".json");
  }
  
  exifr.parse(imgFile, { xmp: true, iptc: true }).then(output => {

    const custom = {
      "custom": {
        "name": folder,
        "links": [
          {
            "site": "500px",
            "url": ""
          },
          {
            "site": "pixelfed",
            "url": ""
          }
        ]
      }
    };

    const meta = { ...custom, ...output };

    let msg = "Meta Data parsed for '" + file + " -> " + meta.ObjectName + "' -> " + metaFile;
    if (meta.ObjectName === undefined) {
      console.log(red(msg));
    } else {
      console.log(msg);
    }

    fs.writeFile(metaFile, JSON.stringify(meta), err => {
      if (err) { console.error(err); }
    });

  });

});
