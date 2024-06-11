const log = require('hexo-log')({ debug: false, silent: false });
const { magenta } = require('chalk');
const path = require('path');
const fs = require('hexo-fs');
const front = require('hexo-front-matter');
const entry = require('hexo-cli');

hexo.extend.generator.register("dynamic-apps", async function(locals) {
  let config = this.config;

  log.info("Generating Dynamic Page " + magenta("APPS") + " ...");


  let result = [];

  /** ----------------------------------------------------- */
  // Init apps page

  let page = { name: "apps" };
  page = getMD(path.join(config.source_dir, "_dynamic", page.name + ".md"), page);

  result.push({
    data: page,
    path: path.join(page.name, "index.html"),
    layout: page.name
  });

  /** ----------------------------------------------------- */
  // Generate app pages
  let apps = fs
    .readdirSync(path.join(config.source_dir, "_dynamic"))
    .filter(entry => entry.startsWith("app-"));

  apps.forEach(entry => {
    let name = entry.split(".")[0];
    let slug = name.replace("app-", "");
    let app = { name : slug }
    app = getMD(path.join(config.source_dir, "_dynamic", entry), app);
    result.push({
      data: app,
      path: path.join("apps", slug, "index.html"),
      layout: name
    });
  });

  return result;
});

function getMD(mdSource, page) {

  // Get MD data
  const md = fs.readFileSync(mdSource);
  let fm = front.parse(md);
  page = {...page, ...fm};

  // Convert Markdown content into HTML
  page.content = hexo.render.renderSync({ text: page._content, engine: 'markdown' });

  return page;
}
