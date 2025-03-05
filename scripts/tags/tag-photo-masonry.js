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

    let item = null;
    let metaPath;

    let assetPath = path.join(that.asset_dir, e + ".jpg")
    if (fs.existsSync(assetPath)) {
      item = {
        type: "asset",
        key: e,
        urlNormal: `/${that.path}${e}.jpg`,
        urlMobile: `/${that.path}${e}.jpg`,
        isPhoto: false
      } 
    }

    let photoPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.photo_dir, "normal", e + ".jpg");
    if (fs.existsSync(photoPath)) { 
      item = {
        type: "photo",
        key: e,
        urlNormal: `/photos/normal/${e}.jpg`,
        urlMobile: `/photos/mobile/${e}.jpg`,
        isPhoto: true
      } 
      metaPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.photo_dir, "meta", e + ".json");
    }
    
    let poolPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.pool_dir, e, "normal.jpg");
    if (fs.existsSync(poolPath)) { 
      item = {
        type: "pool",
        key: e,
        urlNormal: `/pool/${e}/normal.jpg`,
        urlMobile: `/pool/${e}/mobile.jpg`,
        isPhoto: true
      } 
      metaPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.pool_dir, e, "meta.json");
    }
    
    let shedPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.shed_dir, e, "normal.jpg");
    if (fs.existsSync(shedPath)) { 
      item = {
        type: "shed",
        key: e,
        urlNormal: `/shed/${e}/normal.jpg`,
        urlMobile: `/shed/${e}/mobile.jpg`,
        isPhoto: true
      } 
      metaPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.shed_dir, e, "meta.json");
    }

    let reservePath = path.join(_rootDir, hexo.config.static_dir, hexo.config.reserve_dir, e, "normal.jpg");
    if (fs.existsSync(reservePath)) { 
      item = {
        type: "reserve",
        key: e,
        urlNormal: `/reserve/${e}/normal.jpg`,
        urlMobile: `/reserve/${e}/mobile.jpg`,
        isPhoto: true
      } 
      metaPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.reserve_dir, e, "meta.json");
    }

    if (item) {
    
      if (fs.existsSync(metaPath)) {
        let meta = JSON.parse(fs.readFileSync(metaPath));
        item.title =  meta?.ObjectName || meta?.custom.name || e;
      } else {
        item.title = e;
      }
  
      masonry.items.push(item);

    } else {
      console.error("tag-photo-masonry: " + e + " not found in assets, photos, pool, shed or reserve!");
    }
  });

  const element = compileHandlebar(hexo, "photo-masonry.handlebars", masonry);
  return element;
});