const log = require('hexo-log')({ debug: false, silent: false });
const { magenta } = require('chalk');
const path = require('path');

hexo.extend.generator.register("dynamic-apps", async function(locals) {
  log.info("Generating Dynamic Page " + magenta("APPS") + " ...");

  let result = [];

  // apps page
  let page = locals.dynamic.apps;
  result.push({
    data: page,
    path: path.join(page.name, "index.html"),
    layout: "about"
  });

  // app pages ...
  Object.keys(locals.dynamic).forEach(function(key,index) {
    if (key.startsWith("app-")) {
      let app = locals.dynamic[key];
      
      result.push({
        data: app,
        path: path.join("apps", app.name, "index.html"),
        layout: key
      });
    };
  });

  return result;
});
