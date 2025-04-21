const log = require('hexo-log')({ debug: false, silent: false });
const { magenta } = require('chalk');
const path = require('path');
const { getMD, ensurePermaLink } = require("../../lib/tools.cjs");

hexo.on('generateBefore', function() {
  log.info("Getting Dynamic Page " + magenta("COLOPHON") + " ...");

  let page = { name: "colophon" };
  page = getMD(hexo, path.join("_dynamic", page.name + ".md"), page);

  let dyn = {...hexo.locals.get('dynamic'), ...{ colophon: page }};
  hexo.locals.set('dynamic', dyn);

});