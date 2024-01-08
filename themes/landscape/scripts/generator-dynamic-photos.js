const log = require('hexo-log')({ debug: false, silent: false });
const { magenta } = require('chalk');
const path = require('path');
const fs = require('hexo-fs');
const front = require('hexo-front-matter');

const _rootDir = hexo.source_dir.replace("source", "");

hexo.extend.generator.register("dynamic-photos", async function(locals) {
  let config = this.config;

  log.info("Processing photos...");

  let result = [];

  // Get hero photo
  let pHero = getHeroPhoto(config);

  // Get pool photos
  let pPool = getPoolPhotos(config);
  log.info(magenta(pPool.length) + " pool photos");

  // Get shed photos
  let pShed = getShedPhotos(config);
  log.info(magenta(pShed.length) + " shed photos");

  // Get used photos in Posts & Pages
  let pPostPages = getPostAndPagePhotos(config, locals);
  log.info(magenta(pPostPages.length) + " used photos in posts and pages");

  // Get used photos in Drafts
  let pDrafts = getDraftPagePhotos(config);
  log.info(magenta(pDrafts.length) + " used photos in drafts");
  
  // Get used photos in Dynamic pages
  let pDynamic = getDynamicPagePhotos(config);
  log.info(magenta(pDynamic.length) + " used photos in dynamic pages");

  // Get used photos in Anything pages
  let pAnything = getAnythingPagePhotos(config);
  log.info(magenta(pAnything.length) + " used photos in anything pages 'project'");
  
  // Get used photos in Notes
  let pNotes = getNotesPhotos(config);
  log.info(magenta(pNotes.length) + " used photos in notes");

  /** ----------------------------------------------------- */
  // Init photos page
  let pagePhotos = {};
  pagePhotos.name = "photos";

  // Get MD data and convert content into HTML
  const mdSourcePhoto = path.join(config.source_dir, "_dynamic", pagePhotos.name + ".md");
  const mdPhotos = fs.readFileSync(mdSourcePhoto);
  let fmPhotos = front.parse(mdPhotos);
  pagePhotos = {...pagePhotos, ...fmPhotos};
  pagePhotos.content = hexo.render.renderSync({ text: pagePhotos._content, engine: 'markdown' });  

  // Set items for page (excluding Shed photos)
  pagePhotos.items = [...pHero, ...pPool, ...pPostPages, ...pDrafts, ...pDynamic, ...pAnything, ...pNotes]
    .filter(p => (p.name)) //filter out all without photo name
    .sort((a, b) => a.key.localeCompare(b.key));

  result.push({
      data: pagePhotos,
      path: path.join(pagePhotos.name, "index.html"),
      layout: "photos"
  });

  /** ----------------------------------------------------- */
  // Generate photo pages (all, incl. Shed)
  let photos = [...pHero, ...pPool, ...pShed, ...pPostPages, ...pDrafts, ...pDynamic, ...pAnything, ...pNotes]
    .filter(p => (p.name)) //filter out all without photo name
    .sort((a, b) => a.key.localeCompare(b.key));
        
  photos.forEach(item => {
    item.photograph = pagePhotos.photograph;

    item.title = "Photo " + item.name;
    item.path = path.join(config.photo_dir, item.key, "index.html");
    item.slug = item.key;
    item.permalink = config.url + "/" + config.photo_dir + "/" + item.key;

    result.push({
      name: item.key,
      data: item,
      path: path.join(config.photo_dir, item.key, "index.html"),
      layout: "photo"
    });

  });

  /** ----------------------------------------------------- */
  // Init Photo Map page
  let pageMap = {};
  pageMap.name = "photos-map";

  //Get coordinates array without duplicates
  function shortDec(dec) {
    return dec.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
  }
  let coordinates = {};
  let photoCount = 0;
  photos.forEach((obj) => {
    if (obj.meta.latitude && obj.meta.longitude) {
      let latlng = shortDec(obj.meta.latitude) + "|" + shortDec(obj.meta.longitude);
      if (!coordinates.hasOwnProperty(latlng)) {
        coordinates[latlng] = { 
          latitude: obj.meta.latitude,
          longitude: obj.meta.longitude,
          photos: [] 
        };
      }
      if (!coordinates[latlng].photos.find(p => p.name === obj.key)) {
        photoCount++;
        coordinates[latlng].photos.push({
          name: obj.key, 
          title: obj.name,
          year: new Date(obj.meta?.DateTimeOriginal).toLocaleString('en-GB', {year:"numeric"})
        });  
      }      
    }
  });
  pageMap.coordinates = Object.keys(coordinates).map((key) => {     
    return coordinates[key];
  }).sort((a,b) => (a.latlng > b.latlng) ? 1 : ((b.latlng > a.latlng) ? -1 : 0));

  // Get MD data and convert content into HTML
  const mdSourceMap = path.join(config.source_dir, "_dynamic", pageMap.name + ".md");
  const mdMap = fs.readFileSync(mdSourceMap);
  let fmMap = front.parse(mdMap);
  pageMap = {...pageMap, ...fmMap};
  pageMap.content = hexo.render.renderSync({ 
    text: pageMap._content.replace("{{photo.count}}", photoCount), 
    engine: 'markdown' 
  });
    
  result.push({
    data: pageMap,
    path: path.join(pagePhotos.name, "map", "index.html"),
    layout: "photos-map"
  });

  /** ----------------------------------------------------- */
  return result;
});

/** ================================================================================= */

function getHeroPhoto(config) {

  var photoDir = path.join(_rootDir, hexo.config.static_dir, hexo.config.photo_dir);

  let entry = {
    key: key = config.hero.file.replace(".jpg", ""),
    status: "used",
    file: config.hero.file,
    name: config.hero.name,
    article: {
      type: "start",
      title: "Start",
      url: "/index.html"
    }
  };

  entry.pathMobile = "/" + path.join(config.photo_dir, "mobile", entry.file).replace(/\134/g,"/");
  entry.pathTablet = "/" + path.join(config.photo_dir, "tablet", entry.file).replace(/\134/g,"/");
  entry.pathNormal = "/" + path.join(config.photo_dir, "normal", entry.file).replace(/\134/g,"/");

  if (fs.existsSync(path.join(photoDir, "meta" , entry.key + ".json"))) {
    entry.meta = JSON.parse(fs.readFileSync(path.join(photoDir, "meta" , entry.key + ".json")));
  }

  return [entry];  
}

/** ================================================================================= */

function getPoolPhotos(config) {

  var poolDir = path.join(_rootDir, hexo.config.static_dir, hexo.config.pool_dir);

  let pool = fs
    .readdirSync(poolDir)
    .filter(entry => fs.statSync(path.join(poolDir, entry)).isDirectory())
    .map(entry => ({ key: entry, status: "pool", file: null }));

  pool.forEach(entry => {

    if (fs.existsSync(path.join(poolDir, entry.key, "meta.json"))) {
      entry.meta = JSON.parse(fs.readFileSync(path.join(poolDir, entry.key, "meta.json")));
    }

    entry.name = entry.meta?.ObjectName;
    entry.file = entry.key + ".jpg";
    entry.pathMobile = "/" + path.join(config.pool_dir, entry.key, "mobile.jpg").replace(/\134/g,"/");
    entry.pathTablet = "/" + path.join(config.pool_dir, entry.key, "tablet.jpg").replace(/\134/g,"/");
    entry.pathNormal = "/" + path.join(config.pool_dir, entry.key, "normal.jpg").replace(/\134/g,"/");
    entry.article = null;
  });

  return pool;
}

/** ================================================================================= */

function getShedPhotos(config) {

  var shedDir = path.join(_rootDir, hexo.config.static_dir, hexo.config.shed_dir);

  let shed = fs.readdirSync(shedDir)
    .filter(entry => fs.statSync(path.join(shedDir, entry)).isDirectory())
    .map(entry => ({ key: entry, status: "shed", file: null }));

  shed.forEach(entry => {

    if (fs.existsSync(path.join(shedDir, entry.key, "meta.json"))) {
      entry.meta = JSON.parse(fs.readFileSync(path.join(shedDir, entry.key, "meta.json")));
    }

    entry.name = entry.meta?.ObjectName;
    entry.file = entry.key + ".jpg";
    entry.pathMobile = "/" + path.join(config.shed_dir, entry.key, "mobile.jpg").replace(/\134/g,"/");
    entry.pathTablet = "/" + path.join(config.shed_dir, entry.key, "tablet.jpg").replace(/\134/g,"/");
    entry.pathNormal = "/" + path.join(config.shed_dir, entry.key, "normal.jpg").replace(/\134/g,"/");
    entry.article = null;
  });
  return shed;
}

/** ================================================================================= */

function getPostAndPagePhotos(config, locals) {

  var photoDir = path.join(_rootDir, hexo.config.static_dir, hexo.config.photo_dir, "mobile");
  var metaDir = path.join(_rootDir, hexo.config.static_dir, hexo.config.photo_dir, "meta");

  let used = fs
    .readdirSync(photoDir)
    .map(entry => ({ key: null, status: "used", file: entry }));

  let postsAndPages = [...locals.posts.data, ...locals.pages.data].map(fm => {
    if (fm.photograph && !fm.photograph.keepOutOverview) {
      return {
        title: fm.title,
        subTitle: fm.subtitle,
        date: fm.date,
        path: fm.path,
        layout: fm.layout,
        photographFile: fm.photograph.file,
        photographName: fm.photograph.name,
      };
    }
  });

  used.forEach(entry => {
    entry.key = entry.file.replace(".jpg", "");

    if (fs.existsSync(path.join(metaDir, entry.key + ".json"))) {
      entry.meta = JSON.parse(fs.readFileSync(path.join(metaDir, entry.key + ".json")));
    }

    entry.pathMobile = "/" + path.join(config.photo_dir, "mobile", entry.file).replace(/\134/g,"/");
    entry.pathTablet = "/" + path.join(config.photo_dir, "tablet", entry.file).replace(/\134/g,"/");
    entry.pathNormal = "/" + path.join(config.photo_dir, "normal", entry.file).replace(/\134/g,"/");

    let p = postsAndPages.find(p => (p && p.photographFile === entry.file));

    if (p) {
      entry.name = p.photographName;
      entry.article = {
        type: p.layout,
        title: p.title,
        subtitle: p.subTitle,
        url: "/" + p.path.replace("/index.html", "")
      };
    }

  });
  return used;
}

/** ================================================================================= */

function getDraftPagePhotos(config) {

  var draftDir = path.join(_rootDir, config.source_dir, "_drafts");
  var metaDir = path.join(_rootDir, hexo.config.static_dir, hexo.config.photo_dir, "meta");

  let drafts = fs.readdirSync(draftDir)
    .filter(entry => fs.statSync(path.join(draftDir, entry)).isFile())
    .reduce((used, file) => {

      const mdSource = path.join(draftDir, file);
      const md = fs.readFileSync(mdSource);

      let fm = front.parse(md);

      if (fm.photograph && !fm.photograph.keepOutOverview) {

        let entry = {
          key: fm.photograph.file.replace(".jpg", ""),
          status: "used",
          file: fm.photograph.file,
          pathMobile: "/" + path.join(config.photo_dir, "mobile", fm.photograph.file).replace(/\134/g,"/"),
          pathTablet: "/" + path.join(config.photo_dir, "tablet", fm.photograph.file).replace(/\134/g,"/"),
          pathNormal: "/" + path.join(config.photo_dir, "normal", fm.photograph.file).replace(/\134/g,"/"),
          name: fm.photograph.name,
          article: {
            type: "draft",
            title: fm.title,
            subtitle: fm.subTitle,
            url: fm.permalink
          }
        };

        if (fs.existsSync(path.join(metaDir, entry.key + ".json"))) {
          entry.meta = JSON.parse(fs.readFileSync(path.join(metaDir, entry.key + ".json")));
        }

        used.push(entry);
      }
      return used;
    }, []);

    return drafts;
}

/** ================================================================================= */

function getDynamicPagePhotos(config) {

  var dynamicDir = path.join(_rootDir, config.source_dir, "_dynamic");
  var metaDir = path.join(_rootDir, hexo.config.static_dir, hexo.config.photo_dir, "meta");

  let dynamic = fs.readdirSync(dynamicDir)
    .reduce((used, file) => {
      
      const mdSource = path.join(dynamicDir, file);
      const md = fs.readFileSync(mdSource);
      let fm = front.parse(md);

      if (fm.photograph && !fm.photograph.keepOutOverview) {
        
        let entry = {
          key: fm.photograph.file.replace(".jpg", ""),
          status: "used",
          file: fm.photograph.file,
          pathMobile: "/" + path.join(config.photo_dir, "mobile", fm.photograph.file).replace(/\134/g,"/"),
          pathTablet: "/" + path.join(config.photo_dir, "tablet", fm.photograph.file).replace(/\134/g,"/"),
          pathNormal: "/" + path.join(config.photo_dir, "normal", fm.photograph.file).replace(/\134/g,"/"),
          name: fm.photograph.name,
          article: {
            type: "dynamic",
            title: fm.title,
            subtitle: fm.subTitle,
            url: fm.permalink
          }
        };

        if (fs.existsSync(path.join(metaDir, entry.key + ".json"))) {
          entry.meta = JSON.parse(fs.readFileSync(path.join(metaDir, entry.key + ".json")));
        }

        used.push(entry);
      }
      return used;
    }, []);

  return dynamic;
}

/** ================================================================================= */

function getAnythingPagePhotos(config) {

  var anythingDir = path.join(_rootDir, config.source_dir, "_anything/");
  var metaDir = path.join(_rootDir, hexo.config.static_dir, hexo.config.photo_dir, "meta");

  let anything = fs.readdirSync(anythingDir)
    //.filter(f => f === "index.md") //TODO: Better: Filter out duplicates
    .filter(entry => fs.statSync(path.join(anythingDir, entry)).isDirectory())
    .reduce((used, dir) => {

      const mdSource = path.join(anythingDir, dir, "index.md");
      const md = fs.readFileSync(mdSource);
      let fm = front.parse(md);

      if (fm.photograph && !fm.photograph.keepOutOverview) {

        let entry = {
          key: fm.photograph.file.replace(".jpg", ""),
          status: "used",
          file: fm.photograph.file,
          pathMobile: "/" + path.join(config.photo_dir, "mobile", fm.photograph.file).replace(/\134/g,"/"),
          pathTablet: "/" + path.join(config.photo_dir, "tablet", fm.photograph.file).replace(/\134/g,"/"),
          pathNormal: "/" + path.join(config.photo_dir, "normal", fm.photograph.file).replace(/\134/g,"/"),
          name: fm.photograph.name,
          article: {
            type: "anything",
            title: fm.title,
            subtitle: fm.subTitle,
            url: fm.permalink
          }
        };

        if (fs.existsSync(path.join(metaDir, entry.key + ".json"))) {
          entry.meta = JSON.parse(fs.readFileSync(path.join(metaDir, entry.key + ".json")));
        }

        used.push(entry);
      }
      return used;
    }, []);

  return anything;
}

/** ================================================================================= */

function getNotesPhotos(config) {

  var notesDir = path.join(_rootDir, config.source_dir, "_notes");
  var metaDir = path.join(_rootDir, hexo.config.static_dir, hexo.config.photo_dir, "meta");

  let notes = fs.readdirSync(notesDir)
    .filter(entry => fs.statSync(path.join(notesDir, entry)).isDirectory())
    .reduce((used, dir) => { 

      let currentYear = new Date().getFullYear();
      if (dir <= currentYear) { // only this year and earlier are generated

        const mdSource = path.join(notesDir, dir, "index.md");
        const md = fs.readFileSync(mdSource);
        let fm = front.parse(md);
  
        if (fm.photograph) {

          let entry = {
            key: fm.photograph.file.replace(".jpg", ""),
            status: "used",
            file: fm.photograph.file,
            pathMobile: "/" + path.join(config.photo_dir, "mobile", fm.photograph.file).replace(/\134/g,"/"),
            pathTablet: "/" + path.join(config.photo_dir, "tablet", fm.photograph.file).replace(/\134/g,"/"),
            pathNormal: "/" + path.join(config.photo_dir, "normal", fm.photograph.file).replace(/\134/g,"/"),
            name: fm.photograph.name,
            article: {
              type: "notes",
              title: fm.title + " " + dir,
              url: "/notes/" + dir
            }
          };

          if (fs.existsSync(path.join(metaDir, entry.key + ".json"))) {
            entry.meta = JSON.parse(fs.readFileSync(path.join(metaDir, entry.key + ".json")));
          }  

          used.push(entry);
        }
          
      }
      return used;

    }, []);

  return notes;
}
