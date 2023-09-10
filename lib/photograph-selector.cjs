const fs = require("fs");
const hfs = require('hexo-fs');
const path = require("path");
const yaml = require('js-yaml');

const sharp = require('sharp');
sharp.cache(false);

const _currentPath = __dirname;
const _rootPath = path.join(_currentPath, "../");

let _config;
let _poolDir;
let _photosDir;

let _photoName;
let _photoFolder;

class Selector {

  /**
   * Photo Selector
   */
  constructor() {

    // Read Hexo config.yaml
    _config = yaml.load(fs.readFileSync('./_config.yml', 'utf8'));
    _poolDir = path.join(_rootPath, _config.static_dir, _config.pool_dir);
    _photosDir = path.join(_rootPath, _config.static_dir, _config.photo_dir);
  }

  pick() {
    let self = this;

    let photograph = {};

    // List all available pool photos
    let files = hfs.listDirSync(_poolDir);

    let metaFile;
    let info;

    // Find folder with starting HASH char to pick as next photo
    let metaFiles = files.filter(file => file.match(/#.*[\\]meta.json/g));

    if (metaFiles.length === 1) { 
      info = "Specified Pick";
      //---
      metaFile = metaFiles[0];
      _photoFolder = metaFile.split("\\")[0];
      _photoName = metaFile.split("\\")[0].substring(1); //(remove hash char)

    } else {
      info = "Random Pick";
      //---
      metaFiles = files.filter(file => file.match(/.*[\\]meta.json/g));
      //---
      metaFile = metaFiles[Math.floor(Math.random() * metaFiles.length)];
      _photoFolder = metaFile.split("\\")[0];
      _photoName = metaFile.split("\\")[0];
    }

    console.log("PhotoSelector: " + info + " -> " + _photoName);

    // Get meta data from JSON
    let meta = hfs.readFileSync(_poolDir + "\\" + metaFile);
    let metas = JSON.parse(meta);

    // Assign meta data to post Frontmatter
    photograph.file = _photoName + ".jpg";
    photograph.name = metas.ObjectName;

    // Generate photo variants
    self.processFile("normal");
    self.processFile("tablet");
    self.processFile("mobile");

    // Copy meta.json
    hfs.copyFile(_poolDir + "\\" + metaFile, _photosDir + "\\meta\\" + _photoName + ".json");
    
    // Delete no longer used pool folder
    //INFO: Interim approach, because fs.copyFile's callback is not triggered, when using promises
    setTimeout(function() {
      hfs.rmdirSync(_poolDir + "\\" + _photoFolder);
    }, 3000);

    return photograph;
  }

  /**
   * Compress media-typed photo to target folder
   * @param {String} type 
   */
  async processFile(type) {

    let source = _poolDir + "\\" + _photoFolder + "\\" + type + ".jpg";
    let target = _photosDir + "\\" + type + "\\" + _photoName + ".jpg";

    await sharp(source)
      .jpeg({ quality: 75, mozjpeg: true })
      .toFile(target);

    return;
  }

}
module.exports.Selector = Selector;
