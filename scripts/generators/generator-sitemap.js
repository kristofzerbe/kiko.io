const log = require('hexo-log')({ debug: false, silent: false });
const { magenta, blue } = require('chalk');
const path = require('path');
const axios = require('axios');
const fs = require("hexo-fs");
const handlebars = require("handlebars");
const { getHelpers, getNewestDateString } = require("../../lib/tools.cjs");

const _helpers = getHelpers(hexo);
const _rootDir = hexo.source_dir.replace("source", "");

hexo.extend.generator.register("sitemap", async function(locals) {
  log.info("Generating " + magenta("SITEMAP") + " ...");
  
  const config = this.config;

  let links = {
    items: []
  };

  //------------------------------------------------------------------

  //Map Pages
  const pages = locals.pages
    .filter((page) => page.permalink.includes("/downloads") !== true)
    .map((entry) => (get(entry)));
  log.info("-> " + magenta(pages.length) + " pages");
  links.items = [...links.items, ...pages];

  //Map Dynamic Pages
  const dynamic = [];
  Object.keys(locals.dynamic).forEach((key, index) => {
    const entry = locals.dynamic[key];
    if (!entry.hidden) {
      dynamic.push(get(entry));
    }
  });
  log.info("-> " + magenta(dynamic.length) + " dynamic pages");
  links.items = [...links.items, ...dynamic];

  //TODO: Map Anything Pages

  //Map Posts
  const posts = locals.posts
    .filter((post) => post.draft !== true)
    .filter((post) => post.published === undefined || post.published === true)
    .map((entry) => (get(entry)));
  log.info("-> " + magenta(posts.length) + " posts");
  links.items = [...links.items, ...posts];

  //Map Notes
  const notes = locals.notes.map((entry) => (get(entry)));
  log.info("-> " + magenta(notes.length) + " notes");
  links.items = [...links.items, ...notes];

  //------------------------------------------------------------------

  //Render Sitemap by template
  const template = path.join(_rootDir, config.template_dir, config.sitemap.template);
  if (!fs.existsSync(template)) { throw "Sitemap Template file not found"; }

  handlebars.registerHelper('toISOString', function(number) {
    return number.toISOString()
  })
  
  const source = fs.readFileSync(template).toString('utf8');
  const sitemap = handlebars.compile(source);
  const data = sitemap(links);

  return {
    path: config.sitemap.path,
    data: data
  };
  
});

function ensurePermaLink(permalink) {
  if (permalink && permalink.startsWith(hexo.config.url) == false) {
    permalink = hexo.config.url + permalink;
  }
  return permalink;
}

function get(entry) {
  return {
    url: ensurePermaLink(entry.permalink).replace("/index.html", "").replace(".html", ""),
    date: getNewestDateString(entry)
  }
}
