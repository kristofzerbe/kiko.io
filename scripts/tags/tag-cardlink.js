/*
    Card Link Tag

    Syntax:
    {% cardlink %}
      content
    {% endcardlink %}

    Assumed content are line-by-line values:
    host: xxx 
    url: yyy
    ...

    -> see Obsidian Auto Card Links -> https://github.com/nekoshita/obsidian-auto-card-link
*/
const { getDataFromCardlinkCodeBlock, compileHandlebar } = require("../../lib/tools.cjs");

hexo.extend.tag.register("cardlink", function(args, content){

  const lines = getDataFromCardlinkCodeBlock(content, hexo.config.favicon_service_url);
  const element = compileHandlebar(hexo, "cardlink.handlebars", lines);

  return element;

}, {ends: true});