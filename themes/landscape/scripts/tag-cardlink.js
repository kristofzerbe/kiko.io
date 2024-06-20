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
const { getDataFromCardlinkCodeBlock, compileHandlebar } = require("../../../lib/tools.cjs");

hexo.extend.tag.register("cardlink", function(args, content){

  // let lines = { x: null };

  // content.split(/\r?\n/).forEach((line) => {
  //   let item = line.split(/:(.*)/s);
  //   let key = item[0];
  //   let value = item[1].replace(/["]/g, "").trim();
  //   lines[key] = value;
  // });

  // lines.favicon = hexo.config.favicon_service_url.replace("{URL}", lines.url);

  const lines = getDataFromCardlinkCodeBlock(content, hexo.config.favicon_service_url);
  const element = compileHandlebar(hexo, "cardlink.handlebars", lines);

  return element;

}, {ends: true});