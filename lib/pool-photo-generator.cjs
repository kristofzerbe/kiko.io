'use strict';

const { magenta, gray } = require('chalk');

const fs = require("fs");
const path = require("path");

const exifr = require('exifr')

const sharp = require('sharp');
sharp.cache(false); //prevents keeping source file open

const _currentPath = __dirname;

let _inboundFolder;
let _poolFolder;

class PoolPhotoGenerator {

  /**
   * Contructor of PoolPhotoGenerator
   * @param {String} inboundFolder 
   * @param {String} poolFolder 
   */
  constructor(inboundFolder, poolFolder) {

    _inboundFolder = path.join(_currentPath, inboundFolder);
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
        const newPhotoFolder = path.join(_poolFolder, file.replace(path.extname(file), ''));
        fs.mkdirSync(newPhotoFolder);

        // read TITLE from IPTC and write to meta.txt, plus new line
        const iptcMeta = exifr.parse(imgFile, { iptc: true }).then(output => {
          let title = output.ObjectName || "No Title";
          console.log('IPTC data parsed for new pool photo', gray(file), "-> Title:" , magenta(title));

          fs.writeFile(path.join(newPhotoFolder, "meta.txt"), title +"\n", err => {
            if (err) { console.error(err); }
          });
        })
        
        // create resized images
        const resizeMobile = self.resizePoolImage(imgFile, path.join(newPhotoFolder, "mobile.jpg"), 480);
        const resizeTablet = self.resizePoolImage(imgFile, path.join(newPhotoFolder, "tablet.jpg"), 768);
        const resizeNormal = self.resizePoolImage(imgFile, path.join(newPhotoFolder, "normal.jpg"), 1280);

        Promise.all([iptcMeta, resizeMobile, resizeTablet, resizeNormal])
          .then(() => {
            fs.unlinkSync(imgFile); // delete original image
          });
      }
    });
  }

  /**
   * Helper function to resize pool photo
   * @param {String} imgSource 
   * @param {String} imgTarget 
   * @param {Number} sizeWidth 
   */
  async resizePoolImage(imgSource, imgTarget, sizeWidth) {
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