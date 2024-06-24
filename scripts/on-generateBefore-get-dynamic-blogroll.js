const log = require('hexo-log')({ debug: false, silent: false });
const { magenta, blue } = require('chalk');
const path = require('path');
const fs = require('hexo-fs');
const front = require('hexo-front-matter');
const { getMD, getHelpers } = require("../lib/tools.cjs");

hexo.on('generateBefore', function() {
  log.info("Getting Dynamic Page " + magenta("BLOGROLL") + " ...");

  const config = this.config;
  const helpers = getHelpers(hexo);

  let page = { name: "blogroll" };
  page = getMD(hexo, path.join("_dynamic", page.name + ".md"), page);
  page.updated = helpers.moment();

  page.items = [];

  // Get Blogroll data
  const mdBlogroll = path.join(config.data_dir, "21.13 Blogroll.md");
  const blogroll = fs.readFileSync(mdBlogroll);
  const regexp = /```cardlink\n(.*?)\n```/gs
  const matches = blogroll.matchAll(regexp);
  for (const match of matches) { 

    // convert blog's cardlink to Frontmatter for parsing
    let blog = match[0].replace("```cardlink\n", "---\n").replace("\n```", "\n---"); //.replace(/\r?\n|\r/g, ",\n");
    let fmBlog = front.parse(blog);
    delete fmBlog._content;

    fmBlog.favicon = config.favicon_service_url.replace("{URL}", fmBlog.url);

    page.items.push(fmBlog);
  }

  let dyn = {...hexo.locals.get('dynamic'), ...{ blogroll: page }};
  hexo.locals.set('dynamic', dyn);

  //console.log(hexo.locals.get('dynamic'));
});