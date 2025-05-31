const log = require("hexo-log")({ debug: false, silent: false });
const { magenta } = require("chalk");
const path = require('path');
const fs = require('hexo-fs');
const front = require('hexo-front-matter');

const TinyToolsGenerator = require("../../lib/tiny-tools-generator.cjs").TinyToolsGenerator;

hexo.extend.generator.register("tiny-tools", async function(locals) {
  log.info("Generating Dynamic Page " + magenta("TINY TOOLS") + " ...");

  const helpers = Object.keys(hexo.extend.helper.store).reduce((result, name) => {
    result[name] = hexo.extend.helper.get(name).bind({ ...hexo, page: {} });
    return result;
  }, {});

  const mdSource = path.join(this.config.source_dir, "_dynamic", "tiny-tools.md");
  const md = fs.readFileSync(mdSource);
  let fm = front.parse(md);
  let page = fm;

  page.content = hexo.render.renderSync({ text: page._content, engine: 'markdown' });
  page.updated = helpers.moment();

  const generator = new TinyToolsGenerator();
  page.items = generator.generate();

  log.info("-> " + magenta(page.items.length) + " Tiny Tools");

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