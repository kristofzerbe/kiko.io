const fs = require("fs");
const path = require("path");

module.exports = {
  getPhoto: (hexo, photoName, that) => {
    const _rootDir = hexo.source_dir.replace("source", "");

    let item = null;
    let metaPath;

    if (that && that.asset_dir) {
      let assetPath = path.join(that.asset_dir, photoName + ".jpg");
      if (fs.existsSync(assetPath)) {
        item = {
          type: "asset",
          key: photoName,
          urlNormal: `/${that.path}${photoName}.jpg`,
          urlMobile: `/${that.path}${photoName}.jpg`,
          isPhoto: false
        } 
      }
    }

    let photoPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.photo_dir, "normal", photoName + ".jpg");
    if (fs.existsSync(photoPath)) { 
      item = {
        type: "photo",
        key: photoName,
        urlNormal: `/photos/normal/${photoName}.jpg`,
        urlMobile: `/photos/mobile/${photoName}.jpg`,
        isPhoto: true
      } 
      metaPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.photo_dir, "meta", photoName + ".json");
    }
    
    let poolPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.pool_dir, photoName, "normal.jpg");
    if (fs.existsSync(poolPath)) { 
      item = {
        type: "pool",
        key: photoName,
        urlNormal: `/pool/${photoName}/normal.jpg`,
        urlMobile: `/pool/${photoName}/mobile.jpg`,
        isPhoto: true
      } 
      metaPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.pool_dir, photoName, "meta.json");
    }
    
    let shedPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.shed_dir, photoName, "normal.jpg");
    if (fs.existsSync(shedPath)) { 
      item = {
        type: "shed",
        key: photoName,
        urlNormal: `/shed/${photoName}/normal.jpg`,
        urlMobile: `/shed/${photoName}/mobile.jpg`,
        isPhoto: true
      } 
      metaPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.shed_dir, photoName, "meta.json");
    }

    let reservePath = path.join(_rootDir, hexo.config.static_dir, hexo.config.reserve_dir, photoName, "normal.jpg");
    if (fs.existsSync(reservePath)) { 
      item = {
        type: "reserve",
        key: photoName,
        urlNormal: `/reserve/${photoName}/normal.jpg`,
        urlMobile: `/reserve/${photoName}/mobile.jpg`,
        isPhoto: true
      } 
      metaPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.reserve_dir, photoName, "meta.json");
    }

    if (item) {
      if (fs.existsSync(metaPath)) {
        let meta = JSON.parse(fs.readFileSync(metaPath));
        
        item.title =  meta?.ObjectName || meta?.custom.name || photoName;
      } else {
        item.title = photoName;
      }
    }

    return item;
  }
}