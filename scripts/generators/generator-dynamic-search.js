const log = require('hexo-log')({ debug: false, silent: false });
const { magenta } = require('chalk');
const path = require('path');

hexo.extend.generator.register("dynamic-search", async function(locals) {
  log.info("Generating Dynamic Page " + magenta("SEARCH") + " ...");

  let page = locals.dynamic.search;

  return {
    data: page,
    path: path.join(page.name, "index.html"),
    layout: "search"
  };

});
