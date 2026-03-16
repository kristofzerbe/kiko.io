/*
    Photo Masonry Tag: https://github.com/bigbite/macy.js

    Syntax:
    {% photo_masonry ..."photoName" %}
*/

const { compileHandlebar } = require("../../lib/tools.cjs");
const { getPhoto } = require("../../lib/photo-helper.cjs");

hexo.extend.tag.register("photo_masonry", function(args) {
  const that = this;

  let masonry = {
    rnd: Math.random().toString(36).substring(2,8),
    items: []
  }

  args.forEach(function(e) {

    let item = getPhoto(hexo, e, that);
    if (item) {
      masonry.items.push(item);

    } else {
      console.error("tag-photo-masonry: " + e + " not found in assets, photos, pool, shed or reserve!");
    }
  });

  const element = compileHandlebar(hexo, "photo-masonry.handlebars", masonry);
  return element;
});