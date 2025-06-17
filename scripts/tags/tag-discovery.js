/*
  Discovery Tag

  Syntax
  {% discovery "title" "author" "url" [assetFolder] [imgkey] %}
    content
  {% enddiscovery %}

*/
const { getDataFromCardlinkDummyBlock, compileHandlebar } = require("../../lib/tools.cjs");

hexo.extend.tag.register("discovery", function(args, content){

  const [
    title,
    author,
    url,
    assetFolder,
    imgkey
  ] = args;

  let imgSrc, image = "", anchorId;

  if (imgkey?.startsWith("key:")) {
    anchorId = imgkey.split(':')[1];
  } else {
    imgSrc = imgkey;
    image = `
      <a style="display:block; margin: 2rem 0;" class="img-link" href="${url}">
        <img class="limit" src="${imgSrc}" alt="${title}" />
      </a>
    `;
    anchorId = imgkey.split('.')[0];
  }

  // Dummy Cardlink
  const regexp = /@@@cardlink\n(.*?)\n@@@/gs
  const matches = content.matchAll(regexp);
  for (const match of matches) {
    const lines = getDataFromCardlinkDummyBlock(match[0], hexo.config.favicon_service_url);
    const cardlink = compileHandlebar(hexo, "cardlink.handlebars", lines);
    content = content.replace(match[0], cardlink);
  }

  content = hexo.render.renderSync({ text: content, engine: 'markdown' });

  let element = `
    <hr id="${anchorId}"/>
    <div class="discovery">
      <h2 class="link">${title}</h2>
      <small>by ${author}&nbsp;<br><a href="${url}">${url}</a></small>
      ${content}
      ${image}
    </div>
  `;

  return element;

}, {ends: true});