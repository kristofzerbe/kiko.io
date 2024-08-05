/*
    Photo List Tag for global, pool or shed photos

    Syntax:
    {% photo_list ..."photoName|title" %}

*/

//TODO: Refactor like tag-photo-masonry including asses folder images & into handlebars

const fs = require("fs");
const path = require("path");

hexo.extend.tag.register("photo_list", function(args){

  const _rootDir = hexo.source_dir.replace("source", "");

  var list = "";
  args.forEach(function(e) {
    let photoName = e;
    
    let url;
    let metaPath;
    let title = "";

    let photoPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.photo_dir, "normal", photoName + ".jpg");
    if (fs.existsSync(photoPath)) { 
      url = `/photos/normal/${photoName}.jpg`; 
      metaPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.photo_dir, "meta", photoName + ".json");
    }
    
    let poolPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.pool_dir, photoName, "normal.jpg");
    if (fs.existsSync(poolPath)) { 
      url = `/pool/${photoName}/normal.jpg`; 
      metaPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.pool_dir, photoName, "meta.json");
    }
    
    let shedPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.shed_dir, photoName, "normal.jpg");
    if (fs.existsSync(shedPath)) { 
      url = `/shed/${photoName}/normal.jpg`; 
      metaPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.shed_dir, photoName, "meta.json");
    }

    if (fs.existsSync(metaPath)) {
      let meta = JSON.parse(fs.readFileSync(metaPath));
      title = meta?.ObjectName;
    }

    let element = `
      <figure>
        <a href="/photos/${photoName}" class="no-break">
          <img loading="lazy" src="${url}">
        </a>
        <figcaption>${title}</figcaption>
      </figure>
  `;

    list += element;
  });

  var id = "photo-list-" + Math.random().toString(36).substring(2,8);

  var elements = `
    <div class="photo-list" id="${id}">
      ${list}
    </div>
  `;

  return elements;
});