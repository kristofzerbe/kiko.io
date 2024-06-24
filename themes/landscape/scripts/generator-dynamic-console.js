const log = require('hexo-log')({ debug: false, silent: false });
const { magenta } = require('chalk');
const path = require('path');

hexo.extend.generator.register("dynamic-console", async function(locals) {
  log.info("Generating Dynamic Page " + magenta("CONSOLE") + " ...");

  let page = locals.dynamic.console;

  return {
    data: page,
    path: path.join(page.name, "index.html"),
    layout: "console"
  };

});
