const log = require('hexo-log')({ debug: false, silent: false });
const { magenta } = require('chalk');
const path = require('path');
const fs = require('hexo-fs');
const front = require('hexo-front-matter');

hexo.extend.generator.register("dynamic-feeds", async function(locals) {
  let config = this.config;

  log.info("Processing dynamic feeds page...");

  let page = {};
  page.name = "feeds";

  // Get MD data
  const mdSource = path.join(config.source_dir, "_dynamic", page.name + ".md");
  const md = fs.readFileSync(mdSource);
  let fm = front.parse(md);
  page = {...page, ...fm};

  // Convert Markdown content into HTML
  page.content = hexo.render.renderSync({ text: page._content, engine: 'markdown' }); 
  
  // Workaround for not working tag plugin 'feed_microformat' in feeds.md
  // similar to generator-feed-custom.js 
  // ======================================================================================
  const publishedPosts = locals.posts
    .filter((post) => post.draft !== true)
    .filter((post) => post.published === undefined || post.published === true);

  let postsToRender = publishedPosts
    .sort(config.feed.order_by || '-date')
    .limit(config.feed.limit|| 20);

  const slug = (post) => {
    let slugArray = post.slug.split("/");
    let slug = slugArray[slugArray.length - 1];
    return slug;
  }
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };  
  const regEx = /<(script|style)[^>]*>(?<content>[^<]*)<\/(script|style)>/gim;
  const content = (post) => {
    let fc = post.excerpt.replace(regEx, "");
    return fc + '<p><a href="' + post.permalink + '">Continue reading ...</a></p>';
  }
  
  let list = "";
  postsToRender.forEach(post => {
    let img = `<img src="/images/social-media/${slug(post)}.thumb.png" />`;
    let subTitle = (post.subtitle) ? `<h4 class="p-summary">${post.subtitle}</h4>` : "";
    let postCreated = new Date(post.date).toLocaleDateString("en-US", dateOptions);
    let postUpdated = new Date(post.updated).toLocaleDateString("en-US", dateOptions);  
    let updated = (postCreated !== postUpdated) ? `, <small class="dt-updated">Updated: ${postUpdated}</small>` : "";
    let item = `
      <div class="h-entry">
        <details>
          <summary>${img}</summary>
          <header>
            <div>
              <small class="dt-published">${postCreated}</small>
              ${updated}
            </div>
            <h3 class="p-name">
              <a href="${post.permalink}" class="u-url">${post.title}</a>
            </h3>
            ${subTitle}
          </header>
          <article class="e-content">${content(post)}</article>
          <hr class="divider">
        </details>
      </div>
    `;
    list += item;
  });

  let element = `
    <div class="h-feed">
      <data class="p-name" value="${config.title} HTML Microformats Feed"></data>
      <data class="u-url" value="${config.url}/feeds"></data>
      <data class="u-photo" value="${config.url + "/" + config.feed.logo}"></data>
      <data class="p-author h-card">
        <data class="p-name" value="${config.author}"></data>
        <data class="p-url" value="${config.url}"></data>
        <data class="p-photo" value="${config.photo}"></data>
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
