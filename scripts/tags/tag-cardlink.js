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
const { getCardLinkDataFromMarkdown, compileHandlebar } = require("../../lib/tools.cjs");

hexo.extend.tag.register("cardlink", function(args, content){

  //const lines = _etDataFromCardlinkCodeBlock(content, hexo.config.favicon_service_url);
  const cardlinkData = getCardLinkDataFromMarkdown(content, hexo.config.favicon_service_url);
  const element = compileHandlebar(hexo, "cardlink.handlebars", cardlinkData[0]);

  return element;

}, {ends: true});