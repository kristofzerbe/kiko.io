const log = require('hexo-log')({ debug: false, silent: false });
const { magenta } = require('chalk');
const path = require('path');
const fs = require('hexo-fs');
const front = require('hexo-front-matter');

hexo.extend.generator.register("dynamic-about", async function(locals) {
  let config = this.config;

  log.info("Processing dynamic about page...");

  let page = {};
  page.name = "about";

  // Get MD data
  const mdSource = path.join(config.source_dir, "_dynamic", page.name + ".md");
  const md = fs.readFileSync(mdSource);
  let fm = front.parse(md);
  page = {...page, ...fm};

  // Convert Markdown content into HTML
  page.content = hexo.render.renderSync({ text: page._content, engine: 'markdown' });  

  let result = {
      data: page,
      path: path.join(page.name, "index.html"),
      layout: "about"
  };

  return result;

});
