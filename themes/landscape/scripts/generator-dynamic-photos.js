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
  let p1 = getPoolPhotos(config);
  log.info("Processed " + p1.length + " pool photos");
  
  // Get used photos in Posts & Pages
  let p2 = getPostAndPagePhotos(config, locals);
  log.info("Processed " + p2.length + " used photos in posts and pages");

  // Get used photos in Dynmic pages
  let p3 = getDynamicPagePhotos(config);
  log.info("Processed " + p3.length + " used photos in dynamic pages");

  //TODO: anything pages

  // Set items for page
  page.items = [...p1, ...p2, ...p3]
    .filter(p => (p.name)) //filter out all without photo name
    .sort((a, b) => a.key.localeCompare(b.key));
  //log.debug(page.items);

  let result = {
      data: page,
      path: path.join(page.name, "index.html"),
      layout: "photos"
  }

  return result;

});

function getPoolPhotos(config) {
  
  //var poolDir = hexo.source_dir.replace("\source", hexo.config.static_dir + "\/" + hexo.config.pool_dir);
  var poolDir = path.join(hexo.source_dir.replace("source", ""), hexo.config.static_dir, hexo.config.pool_dir);
  log.debug('poolDir = ' + hexo.source_dir + ' -> ' + poolDir);

  let pool = fs
    .readdirSync(poolDir)
    .filter(entry => fs.statSync(path.join(poolDir, entry)).isDirectory())
    .map(entry => ({ key: entry, status: "pool", file: null }));

  pool.forEach(entry => {
    let meta = fs.readFileSync(path.join(poolDir, entry.key, "meta.txt")).split("\n");
    entry.file = "mobile.jpg";
    entry.path = "/" + path.join(config.pool_dir, entry.key, "mobile.jpg").replace(/\134/g,"/");
    entry.photo = "/" + path.join(config.pool_dir, entry.key, "normal.jpg").replace(/\134/g,"/");
    entry.name = meta[0];
    entry.link = meta[1];
    entry.article = null;
  });

//console.log(JSON.stringify(pool));

  return pool;
}

function getPostAndPagePhotos(config, locals) {

  //var usedDir = hexo.source_dir.replace("\source", hexo.config.static_dir + "\/" + hexo.config.photo_dir) + "/mobile";
  var usedDir = path.join(hexo.source_dir.replace("\source", ""), hexo.config.static_dir, hexo.config.photo_dir, "mobile");
  log.debug('usedDir = ' + hexo.source_dir + ' -> ' + usedDir);

  let used = fs
    .readdirSync(usedDir)
    .map(entry => ({ key: null, status: "used", file: entry }))

//console.log(locals.pages.data);

  let postsAndPages = [...locals.posts.data, ...locals.pages.data].map(y => {
    if (y.photograph) {
      return {
        title: y.title,
        subTitle: y.subtitle,
        date: y.date,
        path: y.path,
        layout: y.layout,
        photographFile: y.photograph.file,
        photographName: y.photograph.name,
        photographLink: y.photograph.link
      }  
    }
  });
//console.log(JSON.stringify(postsAndPages));

  used.forEach(entry => {
    entry.key = entry.file.replace(".jpg", "");
    entry.path = "/" + path.join(config.photo_dir, "mobile", entry.file).replace(/\134/g,"/");
    entry.photo = "/" + path.join(config.photo_dir, "normal", entry.file).replace(/\134/g,"/");

    let p = postsAndPages.find(p => (p && p.photographFile === entry.file));
//console.log(entry.file + " -> " + JSON.stringify(p));

    if (p) {
      entry.name = p.photographName;
      entry.link = p.photographLink;
      entry.article = {
        type: p.layout,
        title: p.title,
        subtitle: p.subTitle,
        url: "/" + p.path.replace("/index.html", "")
      }
    }
// if (entry.file.includes("til")) {
//   console.log(entry);
// }

  })
//console.log(JSON.stringify(used));

  return used;
}

function getDynamicPagePhotos(config) {

  var dynamicDir = path.join(config.source_dir, "_dynamic");

  let dynamic = fs.readdirSync(dynamicDir).reduce((acc, file) => {
    const mdSource = path.join(dynamicDir, file);
    const md = fs.readFileSync(mdSource);
    let fm = front.parse(md);

    if (fm.photograph) {
      acc.push({
        key: fm.photograph.file.replace(".jpg", ""),
        status: "used",
        file: fm.photograph.file,
        path: "/" + path.join(config.photo_dir, "mobile", fm.photograph.file).replace(/\134/g,"/"),
        photo: "/" + path.join(config.photo_dir, "normal", fm.photograph.file).replace(/\134/g,"/"),
        name: fm.photograph.name,
        link: fm.photograph.link,
        article: {
          type: "dynamic",
          title: fm.title,
          subtitle: fm.subTitle,
          url: fm.permalink
        }
      });

    }
    return acc;

  }, []);
//console.log(dynamic);

  return dynamic;
}