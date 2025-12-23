const log = require('hexo-log')({ debug: false, silent: false });
const { magenta } = require('chalk');
const path = require('path');

hexo.extend.generator.register("dynamic-photos", async function(locals) {
  log.info("Generating Dynamic Page " + magenta("PHOTOS") + " ...");

  let result = [];

  // photos page
  let page = locals.dynamic.photos;
  result.push({
    data: page,
    path: path.join(page.permalink, "index.html"),
    layout: "photos"
  });

  // photo shed page
  let shed = locals.dynamic.photoshed;
  result.push({
    data: shed,
    path: path.join(shed.permalink, "index.html"),
    layout: "photos-shed"
  });

  // photo map page
  let map = locals.dynamic.photomap;
  result.push({
    data: map,
    path: path.join(map.permalink, "index.html"),
    layout: "photos-map"
  });

  // photo boxes page
  let boxes = locals.dynamic.photoboxes;
  result.push({
    data: boxes,
    path: path.join(boxes.permalink, "index.html"),
    layout: "photos-boxes"
  });

  // photo & photos box pages
  Object.keys(locals.dynamic).forEach(function(key,index) {

    if (key.startsWith("photosbox-")) {
      let box = locals.dynamic[key];
      result.push({
        name: box.key,
        data: box,
        path: box.path,
        layout: "photos-box"
      });
    }

    if (key.startsWith("photo-")) {
      let photo = locals.dynamic[key];
      result.push({
        name: photo.key,
        data: photo,
        path: photo.path,
        layout: "photo"
      });
    };

  });
  
  return result;
});
