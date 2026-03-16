/*
    Photo List Tag for global, pool, shed or asset photos

    Syntax:
    {% photo_list ..."photoName|title" %}

*/

const { compileHandlebar } = require("../../lib/tools.cjs");
const { getPhoto } = require("../../lib/photo-helper.cjs");

hexo.extend.tag.register("photo_list", function(args){
  const that = this;

  let list = {
    rnd: Math.random().toString(36).substring(2,8),
    items: []
  }

  args.forEach(function(e) {

    let item = getPhoto(hexo, e, that);
    if (item) {
      list.items.push(item);

    } else {
      console.error("tag-photo-list: " + e + " not found in assets, photos, pool or shed!");
    }
  });

  const element = compileHandlebar(hexo, "photo-list.handlebars", list);
  return element;
});