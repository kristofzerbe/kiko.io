/*
    (Single) Photo Tag

    Syntax:
    {% photo "photoName" %}
*/

const { getPhoto } = require("../../lib/photo-helper.cjs");
const { compileHandlebar } = require("../../lib/tools.cjs");

hexo.extend.tag.register("photo", function(args) {
  const that = this;

  let [photoName] = args;
  let item = getPhoto(hexo, photoName, that);

  const element = compileHandlebar(hexo, "photo.handlebars", item);
  return element;
});