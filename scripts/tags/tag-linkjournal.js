/*
  LinkJournal Tag

  Syntax
  {% linkjournal "key" "title" "created" "tags" "host" "url" "favicon" "image" %}
    description
    ---
    content
  {% endlinkjournal %}
*/

const { getDataFromCardlinkDummyBlock, compileHandlebar } = require("../../lib/tools.cjs");

hexo.extend.tag.register("linkjournal", function(args, content) {

  const [
    key,
    title,
    created,
    tags,
    host,
    url,
    favicon,
    image
  ] = args;

  let splitContent = content.split("---");
  let description = splitContent[0].trim();
  let contentText = splitContent[1].trim();

  // Dummy Cardlink
  const regexp = /@@@cardlink\n(.*?)\n@@@/gs
  const matches = contentText.matchAll(regexp);
  for (const match of matches) {
    const lines = getDataFromCardlinkDummyBlock(match[0], hexo.config.favicon_service_url);
    const cardlink = compileHandlebar(hexo, "cardlink.handlebars", lines);
    contentText = contentText.replace(match[0], cardlink);
  }
  
  let contentElement = "";
  if (contentText) {
    contentText = hexo.render.renderSync({ text: contentText, engine: 'markdown' });
    contentElement = `<p class="content">${contentText}</p>`;
  }

  let tagElements = tags.split(",").map((tag) => {
    return `<span>${tag}</span>`;
  }).join("\n");

  let imageElement = ""; 
  if (image) imageElement = `<a class="panel-imglink" href="${url}"><img loading="lazy" src="${image}" class="panel-image" /></a>`;

  let createdDateTime = created.split(" ");

  let element = `
    <div class="panel">
      <div class="panel-inner">
        <div data-key="${key}" class="panel-content">
          <a class="panel-favicon" href="${url}"><img src="${favicon}"/></a>
          <time datetime="${created}">${createdDateTime[0]}</time>
          <h2><a class="panel-title" href="${url}">${title}</a></h2>
          <a class="sub-link" href="${url}">${host}</a>
          <div class="tags">${tagElements}</div>
          <blockquote class="description view-trigger">
            <p>${description}</p>
          </blockquote>
          ${imageElement}
          ${contentElement}
        </div>
      </div>
    </div>
  `;

  return element;

}, {ends: true});
