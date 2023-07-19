'use strict';

const log = require('hexo-log')({
  debug: false,
  silent: false
});
const { magenta } = require('chalk');

const fs = require("fs");
const path = require("path");

const sharp = require('sharp');
sharp.cache(false);

const _currentPath = __dirname;

var _inboundFolder;
var _poolFolder;

class PoolPhotoGenerator {

  constructor(inboundFolder, poolFolder) {

    log.info("Running Pool-Photo-Generator...");

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

    const metaFiles = inboundFiles.filter(file => {
      return path.extname(file).toLowerCase() === ".txt";
    });

    metaFiles.forEach((file) => {
      const newPhoto = file.replace(".txt", "");
      log.info("Processing new pool photo " + magenta(newPhoto));

      const imgFileName = newPhoto + ".jpg";
      const imgFile = path.join(_inboundFolder, imgFileName);

      if (fs.existsSync(imgFile)) {
        const newPhotoFolder = path.join(_poolFolder, newPhoto);
        fs.mkdirSync(newPhotoFolder);
        
        // move to meta.txt
        fs.renameSync(path.join(_inboundFolder, file), path.join(newPhotoFolder, "meta.txt"));
                  
        // create resized images
        self.resizePoolImage(imgFile, path.join(newPhotoFolder, "mobile.jpg"), 480);
        self.resizePoolImage(imgFile, path.join(newPhotoFolder, "tablet.jpg"), 768);
        self.resizePoolImage(imgFile, path.join(newPhotoFolder, "normal.jpg"), 1280);

        // delete original image
        setTimeout(() => {
          fs.unlinkSync(imgFile);
        }, 3000);
      }
    });
  }

  async resizePoolImage(imgSource, imgTarget, sizeWidth) {
    log.info("Resizing pool photo " + magenta(imgTarget));
    
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