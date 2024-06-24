const log = require('hexo-log')({ debug: false, silent: false });
const { magenta } = require('chalk');
const path = require('path');

hexo.extend.generator.register("dynamic-photos", async function(locals) {
  log.info("Generating Dynamic Page " + magenta("PHOTOS") + " ...");

  const config = this.config;

  let result = [];

  // photos page
  let page = locals.dynamic.photos;
  result.push({
    data: page,
    path: path.join(page.name, "index.html"),
    layout: "photos"
  });

  // photo pages
  Object.keys(locals.dynamic).forEach(function(key,index) {
    if (key.startsWith("photo-")) {
      let photo = locals.dynamic[key];
      result.push({
        name: photo.key,
        data: photo,
        path: path.join(config.photo_dir, photo.key, "index.html"),
        layout: "photo"
      });
    };
  });

  // photo map page
  let map = locals.dynamic.photomap;
  result.push({
    data: map,
    path: path.join(page.name, "map", "index.html"),
    layout: "photos-map"
  });

  return result;
});
