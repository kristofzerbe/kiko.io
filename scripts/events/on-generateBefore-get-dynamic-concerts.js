const log = require('hexo-log')({ debug: false, silent: false });
const { magenta } = require('chalk');
const path = require('path');
const { getMD } = require("../../lib/tools.cjs");

const ConcertsGenerator = require("../../lib/concerts-generator.cjs").ConcertsGenerator;

hexo.on('generateBefore', function() {
  log.info("Getting Dynamic Page " + magenta("CONCERTS") + " ...");

  let page = { name: "concerts" };
  page = getMD(hexo, path.join("_dynamic", page.name + ".md"), page);

  const generator = new ConcertsGenerator();
  page.items = generator.generate();

  log.info("-> " + magenta(page.items.length) + " concerts");

  let dyn = {...hexo.locals.get('dynamic'), ...{ concerts: page }};
  hexo.locals.set('dynamic', dyn);

});