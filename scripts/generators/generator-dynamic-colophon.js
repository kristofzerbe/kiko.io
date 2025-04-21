const log = require('hexo-log')({ debug: false, silent: false });
const { magenta } = require('chalk');
const path = require('path');

hexo.extend.generator.register("dynamic-colophon", async function(locals) {
  log.info("Generating Dynamic Page " + magenta("COLOPHON") + " ...");

  let result = [];

  let page = locals.dynamic.colophon;

  result.push({
    data: page,
    path: path.join(page.name, "index.html"),
    layout: "colophon"
  });

  return result;
});
