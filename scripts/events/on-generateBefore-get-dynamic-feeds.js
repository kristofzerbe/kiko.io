const log = require('hexo-log')({ debug: false, silent: false });
const { magenta } = require('chalk');
const path = require('path');
const { getMD, getHelpers } = require("../../lib/tools.cjs");

hexo.on('generateBefore', function() {
  log.info("Getting Dynamic Page " + magenta("FEEDS") + " ...");

  const config = this.config;

  const helpers = getHelpers(hexo);

  let page = { name: "feeds" };
  page = getMD(hexo, path.join("_dynamic", page.name + ".md"), page);
  page.updated = helpers.moment();

  page.designation = config.designation.replace("{TITLE}", page.title);
  page.owner = {
    name: config.author,
    email: config.email,
    id: config.url
  }
  page.docs = page.permalink;

  page.items = [];
  config.feed.feed_types.forEach(e => {
    page.items.push({
      title: e.title,
      description: e.description.replace(":limit", config.feed.limit),
      version: e.version,
      feed: config.url + "/" + e.output,
      url: config.url
    });  
  });

  let dyn = {...hexo.locals.get('dynamic'), ...{ feeds: page }};
  hexo.locals.set('dynamic', dyn);

  // console.log(hexo.locals.get('dynamic'));
});