/*
    Photo List Tag for global, pool, shed or asset photos

    Syntax:
    {% photo_list ..."photoName|title" %}

*/

const fs = require("fs");
const path = require("path");

const { compileHandlebar } = require("../../lib/tools.cjs");

hexo.extend.tag.register("photo_list", function(args){
  const that = this;
  const _rootDir = hexo.source_dir.replace("source", "");

  let list = {
    rnd: Math.random().toString(36).substring(2,8),
    items: []
  }

  args.forEach(function(e) {
    
    let item = null;
    let metaPath;

    let assetPath = path.join(that.asset_dir, e + ".jpg")
    if (fs.existsSync(assetPath)) { 
      item = {
        photoName: e,
        title: e,
        url: `/${that.path}${e}.jpg`
      }
    }

    let photoPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.photo_dir, "normal", e + ".jpg");
    if (fs.existsSync(photoPath)) { 
      item = {
        photoName: e,
        title: e,
        url: `/photos/normal/${e}.jpg`
      }
      metaPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.photo_dir, "meta", e + ".json");
    }
    
    let poolPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.pool_dir, e, "normal.jpg");
    if (fs.existsSync(poolPath)) { 
      item = {
        photoName: e,
        title: e,
        url: `/pool/${e}/normal.jpg`
      }
      metaPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.pool_dir, e, "meta.json");
    }
    
    let shedPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.shed_dir, e, "normal.jpg");
    if (fs.existsSync(shedPath)) { 
      item = {
        photoName: e,
        title: e,
        url: `/shed/${e}/normal.jpg`
      }
      metaPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.shed_dir, e, "meta.json");
    }

    let reservePath = path.join(_rootDir, hexo.config.static_dir, hexo.config.reserve_dir, e, "normal.jpg");
    if (fs.existsSync(reservePath)) { 
      item = {
        photoName: e,
        title: e,
        url: `/reserve/${e}/normal.jpg`
      }
      metaPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.reserve_dir, e, "meta.json");
    }

    if (item) {

      if (fs.existsSync(metaPath)) {
        let meta = JSON.parse(fs.readFileSync(metaPath));
        item.title = meta?.ObjectName;
      }
  
      list.items.push(item);

    } else {
      console.error("tag-photo-list: " + e + " not found in assets, photos, pool or shed!");
    }
  });

  const element = compileHandlebar(hexo, "photo-list.handlebars", list);
  return element;
});