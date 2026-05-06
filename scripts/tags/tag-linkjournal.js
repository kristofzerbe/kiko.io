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
  const matches = content.matchAll(regexp);
  for (const match of matches) {
    const lines = getDataFromCardlinkDummyBlock(match[0], hexo.config.favicon_service_url);
    const cardlink = compileHandlebar(hexo, "cardlink.handlebars", lines);
    content = content.replace(match[0], cardlink);
  }

  content = hexo.render.renderSync({ text: content, engine: 'markdown' });

  let tagElements = tags.split(",").map((tag) => {
    return `<li>${tag}</li>`;
  }).join("\n");

  let element = `
    <div class="panel">
      <div class="panel-content">
        <div data-key="${key}" class="panel-content">
          <a class="panel-favicon" href="${url}"><img src="${favicon}"/></a>
          <h2><a class="panel-title" href="${url}">${title}</a></h2>
          <a class="sub-link" href="${url}">${host}</a>
          <ul class="tags">
            ${tagElements}
          </ul>
          <p class="description">${description}</p>
          <img src="${image}" />
          <hr>
          <p class="content">${contentText}</p>
        </div>
      </div>
    </div>
  `;

  return element;

}, {ends: true});
