const log = require('hexo-log')({ debug: false, silent: false });
const path = require('path');
const fs = require('hexo-fs');
const front = require('hexo-front-matter');

hexo.extend.generator.register("dynamic-photos", async function(locals) {
  let config = this.config;

  log.info("Processing photos for dynamic page");

  let page = {};
  page.name = "photos";

  // Get MD data for list
  const mdSource = path.join(config.source_dir, "_dynamic", page.name + ".md");
  const md = fs.readFileSync(mdSource);
  let fm = front.parse(md);
  page = {...page, ...fm};    

  // Convert Markdown content into HTML
  page.content = hexo.render.renderSync({ text: page._content, engine: 'markdown' });  

  // Get pool photos
  var poolDir = hexo.source_dir.replace("\source", hexo.config.static_dir + "\\" + hexo.config.pool_dir);

  let pool = fs
    .readdirSync(poolDir)
    .filter(entry => fs.statSync(path.join(poolDir, entry)).isDirectory())
    .map(entry => ({ name: entry }));

  log.info("Processing " + pool.length + " pool photos");

  pool.forEach(entry => {
    let meta = fs.readFileSync(path.join(poolDir, entry.name, "meta.txt")).split("\n");
    entry.file = "mobile.jpg";
    entry.path = path.join(config.pool_dir, entry.name, entry.name);
    entry.title = meta[0];
    entry.link = meta[1];
  });
//console.log(JSON.stringify(pool));

  // Get used photos
  var usedDir = hexo.source_dir.replace("\source", hexo.config.static_dir + "\\" + hexo.config.photo_dir) + "\mobile";

  let used = fs
    .readdirSync(usedDir)
    .map(entry => ({ file: entry }))

  used.forEach(entry => {
    entry.name = entry.file.replace(".jpg", "");
    entry.path = path.join(config.photo_dir, "mobile", entry.file);
    entry.title = "";
    entry.link = "";
    entry.url = "";
  })
console.log(JSON.stringify(used));

  // Set items for page
  page.items = [];

  let result = {
      data: page,
      path: path.join(page.name, "index.html"),
      layout: "photos"
  }

  return result;
});