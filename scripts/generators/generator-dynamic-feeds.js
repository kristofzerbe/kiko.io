const log = require('hexo-log')({ debug: false, silent: false });
const { magenta } = require('chalk');
const path = require('path');
const fs = require("hexo-fs");
const handlebars = require("handlebars");

const _rootDir = hexo.source_dir.replace("source", "");

hexo.extend.generator.register("dynamic-feeds", async function(locals) {
  log.info("Generating Dynamic Page " + magenta("FEEDS") + " ...");

  const config = this.config;

  let page = locals.dynamic.feeds;
  
  // Workaround for not working tag plugin 'feed_microformat' in feeds.md
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
  
  // Generate MF2/HTML feed
  let feedData = {
    name: config.title,
    url: config.url + "/feeds",
    photo: config.url + "/" + config.feed.logo,
    author: {
      name: config.author,
      url: config.url,
      photo: config.url + "/" + config.photo
    },
    items: []
  };
  postsToRender.forEach(post => {
    let dateCreated = new Date(post.date).toISOString();
    let dateUpdated = new Date(post.updated).toISOString();

    feedData.items.push({
      img: imageSource(post),
      published: dateCreated,
      publishedString: dateCreated.substring(0,10),
      updated: (dateCreated !== dateUpdated) ? dateUpdated : null,
      updatedString: dateUpdated.substring(0,10),
      url: post.permalink,
      title: post.title,
      subtitle: post.subtitle,
      content: content(post)
    });
  });

  const feedTemplate = path.join(_rootDir, config.template_dir, "feed-html-excerpt.handlebars");
  if (!fs.existsSync(feedTemplate)) { throw "HTML Feed template file not found"; }

  const feedSource = fs.readFileSync(feedTemplate).toString('utf8');
  const feed = handlebars.compile(feedSource);
  const feedResult = feed(feedData);

  page.content = page.content.replace("{% feed_microformats %}", feedResult);
  // ======================================================================================

  let result = [];

  result.push({
      data: page,
      path: path.join(page.name, "index.html"),
      layout: "feeds"
  });

  //Render Feed OPML by template and add to result
  log.info("Generating File " + magenta(config.feed.opml_path));
  
  const opmlTemplate = path.join(_rootDir, config.template_dir, config.feed.opml_template);
  if (!fs.existsSync(opmlTemplate)) { throw "Feed OPML template file not found"; }

  handlebars.registerHelper('toISOString', function(number) {
    return number.toISOString()
  })
  
  const opmlSource = fs.readFileSync(opmlTemplate).toString('utf8');
  const opml = handlebars.compile(opmlSource);
  const opmlResult = opml(page);

  result.push({
    path: config.feed.opml_path,
    data: opmlResult
  });

  return result;
});
