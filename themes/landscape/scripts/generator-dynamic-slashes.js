const log = require('hexo-log')({ debug: false, silent: false });
const { magenta } = require('chalk');
const path = require('path');
const fs = require('hexo-fs');
const front = require('hexo-front-matter');

hexo.extend.generator.register("dynamic-slashes", async function(locals) {
  let config = this.config;

  log.info("Generating Dynamic Page " + magenta("SLASHES") + " ...");

  let page = {};
  page.name = "slashes";

  // Get MD data
  const mdSource = path.join(config.source_dir, "_dynamic", page.name + ".md");
  const md = fs.readFileSync(mdSource);
  let fm = front.parse(md);
  page = {...page, ...fm};

  // Convert Markdown content into HTML
  page.content = hexo.render.renderSync({ text: page._content, engine: 'markdown' });

  page.items = [];
  
  page.items.push(getFileInfo("/Search", path.join(config.source_dir, "_dynamic", "search.md")));
  page.items.push(getFileInfo("/Feeds", path.join(config.source_dir, "_dynamic", "feeds.md")));
  page.items.push(getFileInfo("/About", path.join(config.source_dir, "_dynamic", "about.md")));
  page.items.push(getFileInfo("#Contact", path.join(config.source_dir, "_dynamic", "_contact.md")));
  page.items.push(getFileInfo("/Colophon", path.join(config.source_dir, "colophon", "index.md")));
  page.items.push(getFileInfo("/Sitemap.xml", path.join(config.source_dir, "_dynamic", "_sitemap.md")));
  page.items.push(getFileInfo("/Impressum", path.join(config.source_dir, "impressum", "index.md")));
  page.items.push(getFileInfo("/Blogroll", path.join(config.source_dir, "_dynamic", "blogroll.md")));

  let result = {
      data: page,
      path: path.join(page.name, "index.html"),
      layout: "slashes"
  };

  return result;
});

function getFileInfo(title, path) {
  const md = fs.readFileSync(path);
  let fm = front.parse(md);

  fm.title = title;
  fm.path = fm.permalink;

  return fm;
}
