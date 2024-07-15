const log = require('hexo-log')({ debug: false, silent: false });
const { magenta } = require('chalk');
const path = require('path');

hexo.extend.generator.register("dynamic-about", async function(locals) {
  log.info("Generating Dynamic Page " + magenta("ABOUT") + " ...");

  let page = locals.dynamic.about;

  return {
    data: page,
    path: path.join(page.name, "index.html"),
    layout: "about"
  };

});
