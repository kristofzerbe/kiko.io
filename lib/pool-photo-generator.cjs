'use strict';

const { magenta, gray } = require('chalk');

const fs = require("fs");
const path = require("path");

const exifr = require('exifr');

const sharp = require('sharp');
sharp.cache(false); //prevents keeping source file open

const _currentPath = __dirname;

let _inboundFolder;
let _originalFolder;
let _poolFolder;

class PoolPhotoGenerator {

  /**
   * Contructor of PoolPhotoGenerator
   * @param {String} inboundFolder 
   * @param {String} originalFolder
   * @param {String} poolFolder 
   */
  constructor(inboundFolder, originalFolder, poolFolder) {

    _inboundFolder = path.join(_currentPath, inboundFolder);
    _originalFolder = path.join(_currentPath, originalFolder);
    _poolFolder = path.join(_currentPath, poolFolder);

    if (!fs.existsSync(_inboundFolder)) {
      throw "Inbound folder not found"
    }
    if (!fs.existsSync(_poolFolder)) {
      throw "Pool folder not found"
    }
  }

  /**
   * Runs the generation of inbound photos to pool photos
   */
  generate() {
    let self = this;

    const inboundFiles = fs.readdirSync(_inboundFolder);

    const jpgFiles = inboundFiles.filter(file => {
      return path.extname(file).toLowerCase() === ".jpg";
    });

    if (jpgFiles.length === 0) return;

    console.log("Running Pool-Photo-Generator on", magenta(jpgFiles.length), "photos found in inbound folder");

    jpgFiles.forEach((file) => {
      if (file === "placeholder") return; //only needed to prevent empty folder from disappearing

      console.log("Processing new pool photo " + magenta(file));

      const imgFile = path.join(_inboundFolder, file);

      if (fs.existsSync(imgFile)) {
        const folder = file.replace(path.extname(file), '');
        const newPhotoFolder = path.join(_poolFolder, folder);
        if (!fs.existsSync(newPhotoFolder)) fs.mkdirSync(newPhotoFolder);

        // parse meta data and write to json file
        const processMeta = exifr.parse(imgFile, { xmp: true, iptc: true }).then(output => {
          
          const custom = {
            "custom": {
              "name": folder,
              "file": file,
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

          console.log('Meta data parsed and stored for new pool photo', gray(file));

          fs.writeFile(path.join(newPhotoFolder, "meta.json"), JSON.stringify(meta), err => {
            if (err) { console.error(err); }
          });
        });
        
        // create resized images
        const createMobile = self.createImageVariant(imgFile, path.join(newPhotoFolder, "mobile.jpg"), 480);
        const createTablet = self.createImageVariant(imgFile, path.join(newPhotoFolder, "tablet.jpg"), 768);
        const createNormal = self.createImageVariant(imgFile, path.join(newPhotoFolder, "normal.jpg"), 1280);

        Promise.all([processMeta, createMobile, createTablet, createNormal]) //
          .then(() => {
            //fs.unlinkSync(imgFile); // delete original image
            if (!fs.existsSync(_originalFolder)) { fs.mkdirSync(_originalFolder); }
            fs.renameSync(imgFile, path.join(_originalFolder, file)); // move image
          });
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
    console.log("Resizing pool photo " + magenta(imgTarget));
    
    await sharp(imgSource)
      .resize({
        fit: sharp.fit.contain,
        width: sizeWidth
      })
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(imgTarget);
  }
  
}
module.exports.PoolPhotoGenerator = PoolPhotoGenerator;