const log = require("hexo-log")({ debug: false, silent: false });
const { magenta } = require("chalk");
const path = require('path');
const { getHelpers } = require("../../lib/tools.cjs");

const _helpers = getHelpers(hexo);

hexo.extend.generator.register("tiny-tools", async function(locals) {
  log.info("Generating Dynamic Page " + magenta("TINY TOOLS") + " ...");

  let page = locals.dynamic.tinytools;

  page.content = hexo.render.renderSync({ text: page._content, engine: 'markdown' });
  page.updated = _helpers.moment();

  page.tags = [];
  page.items.map( item => {
    page.tags = [...new Set([...page.tags, ...item.tags])].sort();
  });

  return {
    path: path.join(page.permalink, "index.html"),
    data: page,
    layout: "tiny-tools"
  }

});