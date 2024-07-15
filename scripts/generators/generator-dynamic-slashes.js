const log = require('hexo-log')({ debug: false, silent: false });
const { magenta } = require('chalk');
const path = require('path');
const fs = require('hexo-fs');
const front = require('hexo-front-matter');

hexo.extend.generator.register("dynamic-slashes", async function(locals) {
  log.info("Generating Dynamic Page " + magenta("SLASHES") + " ...");

  const config = this.config;

  let page = locals.dynamic.slashes;

  page.items = [];

  config.slashes.forEach(slash => {
    if (slash.items) {
      slash.items.forEach(item => {
        page.items.push(getFileInfo(path.join(config.source_dir, slash.folder, item + ".md")));
      });
    } else {
      page.items.push(getFileInfo(path.join(config.source_dir, slash.folder, "index.md")));
    }
  });

  let result = {
      data: page,
      path: path.join(page.name, "index.html"),
      layout: "slashes"
  };

  return result;
});

function getFileInfo(path) {
  const md = fs.readFileSync(path);
  let fm = front.parse(md);

  fm.title = fm.caption;
  fm.path = fm.permalink;

  return fm;
}

