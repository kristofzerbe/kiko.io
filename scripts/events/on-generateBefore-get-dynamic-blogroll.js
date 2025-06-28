const log = require('hexo-log')({ debug: false, silent: false });
const { magenta } = require('chalk');
const path = require('path');
const fs = require('hexo-fs');
const front = require('hexo-front-matter');
const { getMD, getCardLinkDataFromMarkdown, updateMDField } = require("../../lib/tools.cjs");

const _rootDir = hexo.source_dir.replace("source", "");

hexo.on('generateBefore', function() {
  log.info("Getting Dynamic Page " + magenta("BLOGROLL") + " ...");

  const config = this.config;

  const mdBlogroll = path.join(_rootDir, config.data_dir, config.blogroll.data_file);

  let page = { name: "blogroll" };
  const mdPage = path.join("_dynamic", page.name + ".md");
  page = getMD(hexo, mdPage, page);

  page.designation = config.designation.replace("{TITLE}", page.title);
  page.owner = {
    name: config.author,
    email: config.email,
    id: config.url
  }
  page.docs = page.permalink;

  let blogrollUpdated = fs.statSync(mdBlogroll).mtime; // modified time
  if (!page.updated || blogrollUpdated > new Date(page.updated)) {
    page.updated = updateMDField(hexo, mdPage, "updated", blogrollUpdated);
  }

  page.items = [];

  // Get Blogroll data
  const blogroll = fs.readFileSync(mdBlogroll);
  page.items = getCardLinkDataFromMarkdown(blogroll, config.favicon_service_url);
  page.items.forEach(blog => {
    blog.latest_post = {
      "url": null,
      "title": null,
      "date_published": 0,
      "today_delta": 0
    }
  });

  let dyn = {...hexo.locals.get('dynamic'), ...{ blogroll: page }};
  hexo.locals.set('dynamic', dyn);
  //console.log(hexo.locals.get('dynamic'));
});