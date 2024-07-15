const log = require('hexo-log')({ debug: false, silent: false });
const { magenta } = require('chalk');
const path = require('path');
const { getMD } = require("../../lib/tools.cjs");

hexo.on('generateBefore', function() {
  log.info("Getting Dynamic Page " + magenta("SLASHES") + " ...");

  let page = { name: "slashes" };
  page = getMD(hexo, path.join("_dynamic", page.name + ".md"), page);

  let dyn = {...hexo.locals.get('dynamic'), ...{ slashes: page }};
  hexo.locals.set('dynamic', dyn);

  // console.log(hexo.locals.get('dynamic'));
});