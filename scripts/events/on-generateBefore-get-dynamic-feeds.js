const log = require('hexo-log')({ debug: false, silent: false });
const { magenta } = require('chalk');
const path = require('path');
const { getMD, getHelpers } = require("../../lib/tools.cjs");

hexo.on('generateBefore', function() {
  log.info("Getting Dynamic Page " + magenta("FEEDS") + " ...");

  const helpers = getHelpers(hexo);

  let page = { name: "feeds" };
  page = getMD(hexo, path.join("_dynamic", page.name + ".md"), page);
  page.updated = helpers.moment();

  let dyn = {...hexo.locals.get('dynamic'), ...{ feeds: page }};
  hexo.locals.set('dynamic', dyn);

  // console.log(hexo.locals.get('dynamic'));
});