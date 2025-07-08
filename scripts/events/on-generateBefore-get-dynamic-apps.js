const log = require('hexo-log')({ debug: false, silent: false });
const { magenta } = require('chalk');
const path = require('path');
const fs = require('hexo-fs');
const { getMD } = require("../../lib/tools.cjs");

hexo.on('generateBefore', function() {
  log.info("Getting Dynamic Page " + magenta("APPS") + " ...");

  const config = this.config;

  let pages = {};

  // main APPS page
  let page = { name: "apps" };
  page = getMD(hexo, path.join("_dynamic", page.name + ".md"), page);
  pages.apps = page;
  
  // individual app pages
  let apps = fs
    .readdirSync(path.join(config.source_dir, "_dynamic"))
    .filter(entry => entry.startsWith("app-"));

  apps.forEach(entry => {
    let name = entry.split(".")[0];
    let slug = name.replace("app-", "");
    let app = { name: slug }
    app = getMD(hexo, path.join("_dynamic", entry), app);
    pages[name] = app;
  });

  let dyn = {...hexo.locals.get('dynamic'), ...pages};
  hexo.locals.set('dynamic', dyn);

  // console.log(hexo.locals.get('dynamic'));
});
