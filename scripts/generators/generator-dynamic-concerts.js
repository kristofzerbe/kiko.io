const log = require('hexo-log')({ debug: false, silent: false });
const { magenta } = require('chalk');
const path = require('path');

hexo.extend.generator.register("dynamic-concerts", async function(locals) {
  log.info("Generating Dynamic Page " + magenta("CONCERTS") + " ...");

  let page = locals.dynamic.concerts;

  return {
    path: path.join(page.permalink, "index.html"),
    data: page,
    layout: "concerts"
  };

});
