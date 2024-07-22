const log = require('hexo-log')({ debug: false, silent: false });
const { magenta } = require('chalk');
const path = require('path');
const fs = require("hexo-fs");
// const { config } = require('process');

const _rootDir = hexo.source_dir.replace("source", "");

hexo.extend.generator.register("dynamic-about", async function(locals) {
  log.info("Generating Dynamic Page " + magenta("ABOUT") + " ...");

  let config = this.config;

  let result = [];

  let page = locals.dynamic.about;

  result.push({
    data: page,
    path: path.join(page.name, "index.html"),
    layout: "about"
  });

  // Copy Avatar -> see https://blog.jim-nielsen.com/2023/well-known-avatar/
  /* TODO: Doesn't work this way. File has to return a true JPEG from web server */
  // log.info("Generating File " + magenta(".well-known/avatar"));
  // let source = path.join(_rootDir, config.static_dir, config.avatar);
  // let target = path.join(hexo.public_dir, ".well-known/avatar");
  // fs.copyFile(source, target);

  return result;
});
