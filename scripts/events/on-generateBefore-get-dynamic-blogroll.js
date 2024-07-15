const log = require('hexo-log')({ debug: false, silent: false });
const { magenta } = require('chalk');
const path = require('path');
const fs = require('hexo-fs');
const front = require('hexo-front-matter');
const { getMD, updateMDField } = require("../../lib/tools.cjs");

const _rootDir = hexo.source_dir.replace("source", "");

hexo.on('generateBefore', function() {
  log.info("Getting Dynamic Page " + magenta("BLOGROLL") + " ...");

  const config = this.config;

  const mdBlogroll = path.join(_rootDir, config.data_dir, config.blogroll.data_file);

  let page = { name: "blogroll" };
  const mdPage = path.join("_dynamic", page.name + ".md");
  page = getMD(hexo, mdPage, page);

  let blogrollUpdated = fs.statSync(mdBlogroll).mtime; // modified time
  if (!page.updated || blogrollUpdated > new Date(page.updated)) {
    page.updated = updateMDField(hexo, mdPage, "updated", blogrollUpdated);
  }

  page.items = [];

  // Get Blogroll data
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