'use strict';

const { magenta, gray } = require('chalk');
const yaml = require('js-yaml');
const fs = require("fs");
const path = require("path");
const exifr = require('exifr');

const sharp = require('sharp');
sharp.cache(false); //prevents keeping source file open

const _currentPath = __dirname;
const _rootPath = path.join(_currentPath, "../");

let _config;
let _inboundFolder;
let _originalFolder;
let _photoFolder;

class PhotoGenerator {

  /**
   * Contructor of PhotoGenerator
   * @param {String} inboundFolder 
   * @param {String} originalFolder
   * @param {String} photoFolder 
   */
  constructor(inboundFolder, originalFolder, photoFolder) {

    // Read Hexo config.yaml
    _config = yaml.load(fs.readFileSync('./_config.yml', 'utf8'));

    _inboundFolder = path.join(_currentPath, inboundFolder);
    if (originalFolder) _originalFolder = path.join(_currentPath, originalFolder);
    _photoFolder = path.join(_currentPath, photoFolder);

    if (!fs.existsSync(_inboundFolder)) {
      throw "Inbound folder not found";
    }
    if (!fs.existsSync(_photoFolder)) {
      throw "Photo folder not found";
    }
  }

  /**
   * Runs the generation of inbound photos
   */
  generate() {
    let self = this;

    const inboundFiles = fs.readdirSync(_inboundFolder);

    const jpgFiles = inboundFiles.filter(file => {
      return path.extname(file).toLowerCase() === ".jpg";
    });

    if (jpgFiles.length === 0) return;

    console.log("Running Photo-Generator on", magenta(jpgFiles.length), "photos found in inbound folder");

    jpgFiles.forEach((file) => {
      if (file === "placeholder") return; //only needed to prevent empty folder from disappearing

      console.log("Processing new photo " + magenta(file));

      const imgFile = path.join(_inboundFolder, file);

      file = file.replace(" ", "-"); // ensure preventing spaces

      if (fs.existsSync(imgFile)) {
        const folder = file.replace(path.extname(file), '');
        const newPhotoFolder = path.join(_photoFolder, folder);
        if (!fs.existsSync(newPhotoFolder)) fs.mkdirSync(newPhotoFolder);

        // parse meta data and write to json file
        const processMeta = exifr.parse(imgFile, { xmp: true, iptc: true }).then(output => {
          
          const customMeta = fs.readFileSync(path.join(_rootPath, _config.template_dir, "meta-custom.json"));
          const custom = JSON.parse(customMeta);

          const meta = { ...custom, ...output };
          meta.custom.name = folder;
          meta.custom.file = file;

          console.log('Meta data parsed and stored for new photo', gray(file));

          fs.writeFile(path.join(newPhotoFolder, "meta.json"), JSON.stringify(meta), err => {
            if (err) { console.error(err); }
          });
        });
        
        // create resized images
        const createMobile = self.createImageVariant(imgFile, path.join(newPhotoFolder, "mobile.jpg"), 480);
        const createTablet = self.createImageVariant(imgFile, path.join(newPhotoFolder, "tablet.jpg"), 768);
        const createNormal = self.createImageVariant(imgFile, path.join(newPhotoFolder, "normal.jpg"), 1280);

        if (_originalFolder) {
          Promise.all([processMeta, createMobile, createTablet, createNormal]) //
          .then(() => {
            //fs.unlinkSync(imgFile); // delete original image
            if (!fs.existsSync(_originalFolder)) { fs.mkdirSync(_originalFolder); }
            fs.renameSync(imgFile, path.join(_originalFolder, file)); // move image
          });
        }

      }
    });
  }

  /**
   * Helper function to create image variant
   * @param {String} imgSource 
   * @param {String} imgTarget 
   * @param {Number} sizeWidth 
   */
  async createImageVariant(imgSource, imgTarget, sizeWidth) {
    console.log("Resizing photo " + magenta(imgTarget));
    
    await sharp(imgSource)
      .resize({
        fit: sharp.fit.contain,
        width: sizeWidth,
      })
      .jpeg({ quality: 90, mozjpeg: true })
      .withMetadata()
      .toFile(imgTarget);
  }
  
}
module.exports.PhotoGenerator = PhotoGenerator;