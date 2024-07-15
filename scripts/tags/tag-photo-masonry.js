/*
    Photo Masonry Tag: https://github.com/bigbite/macy.js

    Syntax:
    {% photo_masonry ..."photoName" %}
    
*/

const fs = require("fs");
const path = require("path");

hexo.extend.tag.register("photo_masonry", function(args){

  const _rootDir = hexo.source_dir.replace("source", "");

  var list = "";
  args.forEach(function(e) {
    let photoName = e;
    
    let urlNormal;
    let urlMobile;
    let metaPath;
    let title = photoName;

    let photoPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.photo_dir, "normal", photoName + ".jpg");
    if (fs.existsSync(photoPath)) { 
      urlNormal = `/photos/normal/${photoName}.jpg`;
      urlMobile = `/photos/mobile/${photoName}.jpg`;
      metaPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.photo_dir, "meta", photoName + ".json");
    }
    
    let poolPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.pool_dir, photoName, "normal.jpg");
    if (fs.existsSync(poolPath)) { 
      urlNormal = `/pool/${photoName}/normal.jpg`; 
      urlMobile = `/pool/${photoName}/mobile.jpg`; 
      metaPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.pool_dir, photoName, "meta.json");
    }
    
    let shedPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.shed_dir, photoName, "normal.jpg");
    if (fs.existsSync(shedPath)) { 
      urlNormal = `/shed/${photoName}/normal.jpg`; 
      urlMobile = `/shed/${photoName}/mobile.jpg`; 
      metaPath = path.join(_rootDir, hexo.config.static_dir, hexo.config.shed_dir, photoName, "meta.json");
    }

    if (fs.existsSync(metaPath)) {
      let meta = JSON.parse(fs.readFileSync(metaPath));
      if (typeof meta?.ObjectName !== "undefined") {
        title =  meta?.ObjectName;
      }
    }

    let element = `
      <div>
        <a class="spotlight" href="/photos/${photoName}"
           data-description="${title}"
           data-src="${urlNormal}"
           data-button="Open Page"
           data-button-href="/photos/${photoName}">
          <img src="${urlMobile}">
        </a>
      </div>
  `;

    list += element;
  });

  var rnd = Math.random().toString(36).substring(2,8);
  var id = "photo-masonry-" + rnd;

  var elements = `
    <div class="photo-masonry" id="${id}">
      ${list}
    </div>
    <script>
      let macy_${rnd} = new Macy({
        container: '#${id}',
        trueOrder: false,
        waitForImages: false,
        useOwnImageLoader: false,
        debug: true,
        mobileFirst: true,
        columns: 2,
        margin: {
          y: 6,
          x: 6
        },
        breakAt: {
          980: {
            margin: {
              x: 8,
              y: 8
            },
            columns: 3
          },
          768: 2,
          640: 3
        }
      });
      Spotlight.init();
  </script>
  `;

  return elements;
});