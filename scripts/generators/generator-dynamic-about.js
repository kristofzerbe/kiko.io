const log = require('hexo-log')({ debug: false, silent: false });
const { magenta } = require('chalk');
const path = require('path');
const fs = require("hexo-fs");
// const { config } = require('process');

const _rootDir = hexo.source_dir.replace("source", "");

hexo.extend.generator.register("dynamic-about", async function(locals) {
  log.info("Generating Dynamic Page " + magenta("ABOUT") + " ...");

  let result = [];

  let page = locals.dynamic.about;

  result.push({
    path: path.join(page.permalink, "index.html"),
    data: page,
    layout: "about"
  });

  // Copy Avatar -> see https://blog.jim-nielsen.com/2023/well-known-avatar/
  /* TODO: Doesn't work this way. File has to return a true JPEG from web server */
  // log.info("Generating File " + magenta(".well-known/avatar"));
  // let source = path.join(_rootDir, config.static_dir, config.avatar);
  // let target = path.join(hexo.public_dir, ".well-known/avatar");
  // fs.copyFile(source, target);

  // for https://aboutspec.org
  let content = page._content
    .replace(/<div class="profile-links">[\s\S]*?<\/div>/g, "") //profile links
    .replace(/<\/?[A-Za-z][^>]*>/g, "") //other HTML tags
    .replace(/^---[\s\S]*?---/, "") //Frontmatter
    .replace(/[\r\n]{3,}/g, '\n\n'); //multiple line breaks

  content = `---
summary: ${hexo.config.author} - ${hexo.config.author_desc}
---
${content}
`

  result.push({
    path: ".well-known/about.md",
    data: content
  });

  return result;
});
