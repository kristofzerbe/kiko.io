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
    
    let item = {
      photoName: e,
      title: e,
      url: ""
    }
    let metaPath;

    let assetPath = path.join(that.asset_dir, item.photoName + ".jpg")
    if (fs.existsSync(assetPath)) { 
      item.url = `/${that.path}${item.photoName}.jpg`;
    }

    let photoPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.photo_dir, "normal", item.photoName + ".jpg");
    if (fs.existsSync(photoPath)) { 
      item.url = `/photos/normal/${item.photoName}.jpg`; 
      metaPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.photo_dir, "meta", item.photoName + ".json");
    }
    
    let poolPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.pool_dir, item.photoName, "normal.jpg");
    if (fs.existsSync(poolPath)) { 
      item.url = `/pool/${item.photoName}/normal.jpg`; 
      metaPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.pool_dir, item.photoName, "meta.json");
    }
    
    let shedPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.shed_dir, item.photoName, "normal.jpg");
    if (fs.existsSync(shedPath)) { 
      item.url = `/shed/${item.photoName}/normal.jpg`; 
      metaPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.shed_dir, item.photoName, "meta.json");
    }

    if (fs.existsSync(metaPath)) {
      let meta = JSON.parse(fs.readFileSync(metaPath));
      item.title = meta?.ObjectName;
    }

    list.items.push(item);
  });

  const element = compileHandlebar(hexo, "photo-list.handlebars", list);
  return element;
});