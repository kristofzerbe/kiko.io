/*
    Photo Masonry Tag: https://github.com/bigbite/macy.js

    Syntax:
    {% photo_masonry ..."photoName" %}
    
*/

const fs = require("fs");
const path = require("path");

const { compileHandlebar } = require("../../lib/tools.cjs");

hexo.extend.tag.register("photo_masonry", function(args) {
  const that = this;
  const _rootDir = hexo.source_dir.replace("source", "");

  let masonry = {
    rnd: Math.random().toString(36).substring(2,8),
    items: []
  }

  args.forEach(function(e) {

    let item = {
      photoName: e,
      title: e,
      urlNormal: "",
      urlMobile: "",
      isPhoto: true
    }
    let metaPath;

    let assetPath = path.join(that.asset_dir, item.photoName + ".jpg")
    if (fs.existsSync(assetPath)) { 
      item.urlNormal = `/${that.path}${item.photoName}.jpg`;
      item.urlMobile = item.urlNormal;
      item.isPhoto = false;
    }

    let photoPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.photo_dir, "normal", item.photoName + ".jpg");
    if (fs.existsSync(photoPath)) { 
      item.urlNormal = `/photos/normal/${item.photoName}.jpg`;
      item.urlMobile = `/photos/mobile/${item.photoName}.jpg`;
      metaPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.photo_dir, "meta", item.photoName + ".json");
    }
    
    let poolPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.pool_dir, item.photoName, "normal.jpg");
    if (fs.existsSync(poolPath)) { 
      item.urlNormal = `/pool/${item.photoName}/normal.jpg`; 
      item.urlMobile = `/pool/${item.photoName}/mobile.jpg`; 
      metaPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.pool_dir, item.photoName, "meta.json");
    }
    
    let shedPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.shed_dir, item.photoName, "normal.jpg");
    if (fs.existsSync(shedPath)) { 
      item.urlNormal = `/shed/${item.photoName}/normal.jpg`; 
      item.urlMobile = `/shed/${item.photoName}/mobile.jpg`; 
      metaPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.shed_dir, item.photoName, "meta.json");
    }

    if (!item.urlNormal || !item.urlMobile) {
      console.error(photoName + " not found in assets, photos, pool or shed!");
    }

    if (fs.existsSync(metaPath)) {
      let meta = JSON.parse(fs.readFileSync(metaPath));
      if (typeof meta?.ObjectName !== "undefined") {
        item.title =  meta?.ObjectName;
      }
    }

    masonry.items.push(item);
  });

  const element = compileHandlebar(hexo, "photo-masonry.handlebars", masonry);
  return element;
});