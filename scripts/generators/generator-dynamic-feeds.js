const log = require('hexo-log')({ debug: false, silent: false });
const { magenta } = require('chalk');
const path = require('path');

hexo.extend.generator.register("dynamic-feeds", async function(locals) {
  log.info("Generating Dynamic Page " + magenta("FEEDS") + " ...");

  const config = this.config;

  let page = locals.dynamic.feeds;
  
  // Workaround for not working tag plugin 'feed_microformat' in feeds.md
  // similar to generator-feed-custom.js 
  // ======================================================================================
  const publishedPosts = locals.posts
    .filter((post) => post.draft !== true)
    .filter((post) => post.published === undefined || post.published === true);

  let postsToRender = publishedPosts
    .sort(config.feed.order_by || '-date')
    .limit(config.feed.limit|| 20);

  const imageSource = (item) => {
    if (item.photograph) {
      if (item.photograph.socialmedia) {
        return item.photograph.socialmedia
          .replace("/static", "")
          .replace(".png", ".thumb.png");
      } else {
        return config.url + "/photos/mobile/" + item.photograph.file;
      }
    }
  }

  const regEx = /<(script|style)[^>]*>(?<content>[^<]*)<\/(script|style)>/gim;
  const content = (post) => {
    let fc = post.excerpt.replace(regEx, "");
    return fc + '<p><a href="' + post.permalink + '">Continue reading ...</a></p>';
  }
  
  let list = "";
  postsToRender.forEach(post => {
    let img = `<img src="${imageSource(post)}" />`;
    let subTitle = (post.subtitle) ? `<h4 class="p-summary">${post.subtitle}</h4>` : "";
    let dateCreated = new Date(post.date).toISOString();
    let dateUpdated = new Date(post.updated).toISOString();
    let updated = (dateCreated !== dateUpdated) ? `, <time class="dt-updated" datetime="${dateUpdated}">Updated: ${dateUpdated.substring(0,10)}</time>` : "";
    
    //TODO: outsource to handlebars template
    let item = `
      <div class="h-entry">
        <details>
          <summary>${img}</summary>
          <header>
            <div>
              <time class="dt-published" datetime="${dateCreated}">${dateCreated.substring(0,10)}</time>
              ${updated}
            </div>
            <h3 class="p-name">
              <a href="${post.permalink}" class="u-url">${post.title}</a>
            </h3>
            ${subTitle}
          </header>
          <article class="e-content article-entry">${content(post)}</article>
          <hr class="divider">
        </details>
      </div>
    `;
    list += item;
  });

  //TODO: outsource to handlebars template
  let element = `
    <div class="h-feed">
      <data class="p-name" value="${config.title} HTML Microformats Feed"></data>
      <data class="u-url" value="${config.url}/feeds"></data>
      <data class="u-photo" value="${config.url + "/" + config.feed.logo}"></data>
      <data class="p-author h-card">
        <data class="p-name" value="${config.author}"></data>
        <data class="p-url" value="${config.url}"></data>
        <data class="p-photo" value="${config.url + "/" + config.photo}"></data>
      </data>
      ${list}
    </div>
  `;

  page.content = page.content.replace("{% feed_microformats %}", element);
  // ======================================================================================

  let result = {
      data: page,
      path: path.join(page.name, "index.html"),
      layout: "feeds"
  };

  return result;

});
