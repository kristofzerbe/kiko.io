const log = require('hexo-log')({ debug: false, silent: false });
const { magenta } = require('chalk');
const path = require('path');
const { getMD } = require("../../lib/tools.cjs");

const TinyToolsGenerator = require("../../lib/tiny-tools-generator.cjs").TinyToolsGenerator;

hexo.on('generateBefore', function() {
  log.info("Getting Dynamic Page " + magenta("TINY TOOLS") + " ...");

  let page = { name: "tiny-tools" };
  page = getMD(hexo, path.join("_dynamic", page.name + ".md"), page);

  const generator = new TinyToolsGenerator();
  page.items = generator.generate();

  log.info("-> " + magenta(page.items.length) + " Tiny Tools");

  let dyn = {...hexo.locals.get('dynamic'), ...{ tinytools: page }};
  hexo.locals.set('dynamic', dyn);

});