const log = require('hexo-log')({ debug: false, silent: false });
const { magenta } = require('chalk');
const path = require('path');
const fs = require('hexo-fs');
const front = require('hexo-front-matter');
const { getMD, getHelpers } = require("../lib/tools.cjs");

const _rootDir = hexo.source_dir.replace("source", "");

hexo.on('generateBefore', function() {
  log.info("Getting Dynamic Page " + magenta("PHOTOS") + " ...");

  const config = this.config;
  const helpers = getHelpers(hexo);

  let pages = {};

  // get photos
  let pHero = getHeroPhoto();
  let pPool = getPoolPhotos();
  let pShed = getShedPhotos();
  let pPostPages = getPostAndPagePhotos();
  let pDrafts = getDraftPagePhotos();
  let pDynamic = getDynamicPagePhotos();
  let pAnything = getAnythingPagePhotos();
  let pNotes = getNotesPhotos();

  // PHOTOS page -------------------------------------------
  let page = { name: "photos" };
  page = getMD(hexo, path.join("_dynamic", page.name + ".md"), page);
  page.updated = helpers.moment();

  page.items = [...pHero, ...pPool, ...pPostPages, ...pDrafts, ...pDynamic, ...pAnything, ...pNotes]
    .filter(p => (p.name)) //filter out all without photo name
    .sort((a, b) => a.key.localeCompare(b.key));

  pages.photos = page;
// console.log(page);

  // individual PHOTO pages -----------------------------------
  let photos = [...pHero, ...pPool, ...pShed, ...pPostPages, ...pDrafts, ...pDynamic, ...pAnything, ...pNotes]
    .filter(p => (p.name)) //filter out all without photo name
    .sort((a, b) => a.key.localeCompare(b.key));

  photos.forEach(photo => {
    photo.photograph = page.photograph;
    photo.title = "Photo " + photo.name;
    photo.path = path.join(config.photo_dir, photo.key, "index.html");
    photo.slug = photo.key;
    photo.permalink = config.url + "/" + config.photo_dir + "/" + photo.key;
    photo.type = "photo";
    photo.updated = helpers.moment();

    pages["photo-" + photo.key] = photo;
  });

  // PHOTO MAP page -------------------------------------------
  let map = { name: "photos-map" };
  map = getMD(hexo, path.join("_dynamic", map.name + ".md"), map);
  map.updated = helpers.moment();

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
  map.coordinates = Object.keys(coordinates).map((key) => {     
    return coordinates[key];
  }).sort((a,b) => (a.latlng > b.latlng) ? 1 : ((b.latlng > a.latlng) ? -1 : 0));

  map.content = map.content.replace("{{photo.count}}", photoCount);

  pages.photomap = map;

  // ------------------------------------------------------------

  let dyn = {...hexo.locals.get('dynamic'), ...pages};
  hexo.locals.set('dynamic', dyn);

  // console.log(hexo.locals.get('dynamic'));
});

function shortDec(dec) {
  return dec.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
}

/** ================================================================================= */

function getHeroPhoto() {
  const config = hexo.config;

  var photoDir = path.join(_rootDir, config.static_dir, config.photo_dir);

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

function getPoolPhotos() {
  const config = hexo.config;

  var poolDir = path.join(_rootDir, config.static_dir, config.pool_dir);

  let pool = fs
    .readdirSync(poolDir)
    .filter(entry => fs.statSync(path.join(poolDir, entry)).isDirectory())
    .map(entry => ({ key: entry, status: "pool", file: null }));

  pool.forEach(entry => {

    let meta;
    if (fs.existsSync(path.join(poolDir, entry.key, "meta.json"))) {
      meta = JSON.parse(fs.readFileSync(path.join(poolDir, entry.key, "meta.json")));
    }

    entry.file = entry.key + ".jpg";
    entry.name = meta?.ObjectName;
    entry.meta = meta;
    entry.pathMobile = "/" + path.join(config.pool_dir, entry.key, "mobile.jpg").replace(/\134/g,"/");
    entry.pathTablet = "/" + path.join(config.pool_dir, entry.key, "tablet.jpg").replace(/\134/g,"/");
    entry.pathNormal = "/" + path.join(config.pool_dir, entry.key, "normal.jpg").replace(/\134/g,"/");
    entry.article = null;
  });

  log.info("-> " + magenta(pool.length) + " pool photos");
  return pool;
}

/** ================================================================================= */

function getShedPhotos() {
  const config = hexo.config;

  var shedDir = path.join(_rootDir, config.static_dir, config.shed_dir);

  let shed = fs.readdirSync(shedDir)
    .filter(entry => fs.statSync(path.join(shedDir, entry)).isDirectory())
    .map(entry => ({ key: entry, status: "shed", file: null }));

  shed.forEach(entry => {

    let meta;
    if (fs.existsSync(path.join(shedDir, entry.key, "meta.json"))) {
      meta = JSON.parse(fs.readFileSync(path.join(shedDir, entry.key, "meta.json")));
    }

    entry.file = entry.key + ".jpg";
    entry.name = entry.meta?.ObjectName ?? entry.key;
    entry.meta = meta;
    entry.pathMobile = "/" + path.join(config.shed_dir, entry.key, "mobile.jpg").replace(/\134/g,"/");
    entry.pathTablet = "/" + path.join(config.shed_dir, entry.key, "tablet.jpg").replace(/\134/g,"/");
    entry.pathNormal = "/" + path.join(config.shed_dir, entry.key, "normal.jpg").replace(/\134/g,"/");
    entry.article = null;
  });

  log.info("-> " + magenta(shed.length) + " shed photos");
  return shed;
}

/** ================================================================================= */

function getPostAndPagePhotos() {
  const config = hexo.config;
  const locals = hexo.locals;

  var photoDir = path.join(_rootDir, config.static_dir, config.photo_dir, "mobile");
  var metaDir = path.join(_rootDir, config.static_dir, config.photo_dir, "meta");

  let used = fs
    .readdirSync(photoDir)
    .map(entry => ({ key: null, status: "used", file: entry }));

  let postsAndPages = [...locals.get("posts").data, ...locals.get("pages").data].map(fm => {
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
  // console.log(postsAndPages);

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

  log.info("-> " + magenta(used.length) + " used photos in posts and pages");
  // console.log(used);
  return used;
}

/** ================================================================================= */

function getDraftPagePhotos() {
  const config = hexo.config;

  var draftDir = path.join(_rootDir, config.source_dir, "_drafts");
  var metaDir = path.join(_rootDir, config.static_dir, config.photo_dir, "meta");

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
          name: fm.photograph.name,
          pathMobile: "/" + path.join(config.photo_dir, "mobile", fm.photograph.file).replace(/\134/g,"/"),
          pathTablet: "/" + path.join(config.photo_dir, "tablet", fm.photograph.file).replace(/\134/g,"/"),
          pathNormal: "/" + path.join(config.photo_dir, "normal", fm.photograph.file).replace(/\134/g,"/"),
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

    log.info("-> " + magenta(drafts.length) + " used photos in drafts");
    return drafts;
}

/** ================================================================================= */

function getDynamicPagePhotos() {
  const config = hexo.config;

  var dynamicDir = path.join(_rootDir, config.source_dir, "_dynamic");
  var metaDir = path.join(_rootDir, config.static_dir, config.photo_dir, "meta");

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
          name: fm.photograph.name,
          pathMobile: "/" + path.join(config.photo_dir, "mobile", fm.photograph.file).replace(/\134/g,"/"),
          pathTablet: "/" + path.join(config.photo_dir, "tablet", fm.photograph.file).replace(/\134/g,"/"),
          pathNormal: "/" + path.join(config.photo_dir, "normal", fm.photograph.file).replace(/\134/g,"/"),
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

  log.info("-> " + magenta(dynamic.length) + " used photos in dynamic pages");
  return dynamic;
}

/** ================================================================================= */

function getAnythingPagePhotos() {
  const config = hexo.config;

  var anythingDir = path.join(_rootDir, config.source_dir, "_anything/");
  var metaDir = path.join(_rootDir, config.static_dir, config.photo_dir, "meta");

  let used = [];

  fs.readdirSync(anythingDir)
    .filter(entry => fs.statSync(path.join(anythingDir, entry)).isDirectory())
    .forEach((dir) => {

      let itemDir = path.join(anythingDir, dir);
      fs.readdirSync(itemDir)
        .filter(entry => fs.statSync(path.join(itemDir, entry)).isFile())
        .forEach((file) => {

          const mdSource = path.join(itemDir, file);
          const md = fs.readFileSync(mdSource);
    
          let fm = front.parse(md);
          let photoKey = fm.photograph.file.replace(".jpg", "");
          if (fm.photograph && !fm.photograph.keepOutOverview && !used.some(e => e.key === photoKey)) {

            let entry = {
              key: photoKey,
              status: "used",
              file: fm.photograph.file,
              name: fm.photograph.name,
              pathMobile: "/" + path.join(config.photo_dir, "mobile", fm.photograph.file).replace(/\134/g,"/"),
              pathTablet: "/" + path.join(config.photo_dir, "tablet", fm.photograph.file).replace(/\134/g,"/"),
              pathNormal: "/" + path.join(config.photo_dir, "normal", fm.photograph.file).replace(/\134/g,"/"),
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
        });

    }, []);

  log.info("-> " + magenta(used.length) + " used photos in anything pages 'project'");
  return used;
}

/** ================================================================================= */

function getNotesPhotos() {
  const config = hexo.config;

  var notesDir = path.join(_rootDir, config.source_dir, "_notes");
  var metaDir = path.join(_rootDir, config.static_dir, config.photo_dir, "meta");

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
            name: fm.photograph.name,
            pathMobile: "/" + path.join(config.photo_dir, "mobile", fm.photograph.file).replace(/\134/g,"/"),
            pathTablet: "/" + path.join(config.photo_dir, "tablet", fm.photograph.file).replace(/\134/g,"/"),
            pathNormal: "/" + path.join(config.photo_dir, "normal", fm.photograph.file).replace(/\134/g,"/"),
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

    log.info("-> " + magenta(notes.length) + " used photos in notes");
    return notes;
}
