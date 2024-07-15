const log = require('hexo-log')({ debug: false, silent: false });
const { magenta } = require('chalk');
const path = require('path');
const fs = require('hexo-fs');
const front = require('hexo-front-matter');
const { getMD, updateMDField } = require("../../lib/tools.cjs");

const _rootDir = hexo.source_dir.replace("source", "");

hexo.on('generateBefore', function() {
  log.info("Getting Dynamic Page " + magenta("PHOTOS") + " ...");

  const config = this.config;

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

  let photos = [...pHero, ...pPool, ...pShed, ...pPostPages, ...pDrafts, ...pDynamic, ...pAnything, ...pNotes]
    .filter(p => (p.name)) //filter out all without photo name
    .sort((a, b) => a.key.localeCompare(b.key));

  let newestPhotoDate = new Date(Math.max(...photos.map(p => new Date(p.date))));
// console.log(newestPhotoDate);

  // PHOTOS page -------------------------------------------
  let page = { name: "photos" };
  let mdPage = path.join("_dynamic", page.name + ".md");
  page = getMD(hexo, mdPage, page);

  if (!page.updated || newestPhotoDate > new Date(page.updated)) { 
    page.updated = updateMDField(hexo, mdPage, "updated", newestPhotoDate);
  }

  page.items = [...pHero, ...pPool, ...pPostPages, ...pDrafts, ...pDynamic, ...pAnything, ...pNotes]
    .filter(p => (p.name)) //filter out all without photo name
    .sort((a, b) => a.key.localeCompare(b.key));

  pages.photos = page;
// console.log(page);

  // individual PHOTO pages -----------------------------------
  photos.forEach(photo => {
    photo.photograph = page.photograph;
    photo.title = "Photo " + photo.name;
    photo.path = path.join(config.photo_dir, photo.key, "index.html");
    photo.slug = photo.key;
    photo.permalink = config.url + "/" + config.photo_dir + "/" + photo.key;
    photo.type = "photo";

    if (photo.article && photo.article.date > new Date(photo.date)) {
      photo.updated = photo.article.date;
    }

    pages["photo-" + photo.key] = photo;
  });

  // PHOTO MAP page -------------------------------------------
  let map = { name: "photos-map" };
  let mdMap = path.join("_dynamic", map.name + ".md");
  map = getMD(hexo, mdMap, map);

  if (!map.updated || newestPhotoDate > new Date(map.updated)) { 
    map.updated = updateMDField(hexo, mdMap, "updated", newestPhotoDate);
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
  map.coordinates = Object.keys(coordinates).map((key) => {     
    return coordinates[key];
  }).sort((a,b) => (a.latlng > b.latlng) ? 1 : ((b.latlng > a.latlng) ? -1 : 0));

  map.content = map.content.replace("{% photo.count %}", photoCount);

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

  let photoDir = path.join(_rootDir, config.static_dir, config.photo_dir);

  let key = config.hero.file.replace(".jpg", "");

  let metaFile = path.join(photoDir, "meta" , key + ".json");
  let metaCreationDate, meta;
  if (fs.existsSync(metaFile)) {    
    metaCreationDate = fs.statSync(metaFile).birthtime;
    meta = JSON.parse(fs.readFileSync(metaFile));
  }

  let entry = {
    key: key,
    status: "used",
    file: config.hero.file,
    route: key, //meta?.custom.name || key,
    name: config.hero.name,
    article: {
      type: "start",
      title: "Start",
      url: "/index.html"
    },
    pathMobile: "/" + path.join(config.photo_dir, "mobile", config.hero.file).replace(/\134/g,"/"),
    pathTablet: "/" + path.join(config.photo_dir, "tablet", config.hero.file).replace(/\134/g,"/"),
    pathNormal: "/" + path.join(config.photo_dir, "normal", config.hero.file).replace(/\134/g,"/"),
    date: metaCreationDate,
    meta: meta
  };

  log.info("-> " + magenta("1") + " hero photo");
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

    let metaFile = path.join(poolDir, entry.key, "meta.json");
    let metaCreationDate, meta;
    if (fs.existsSync(metaFile)) {
      metaCreationDate = fs.statSync(metaFile).birthtime;
      meta = JSON.parse(fs.readFileSync(metaFile));
    }

    entry.file = entry.key + ".jpg";
    entry.route = entry.key; //meta?.custom.name || entry.key;
    entry.name = meta?.ObjectName;
    entry.article = null;
    entry.pathMobile = "/" + path.join(config.pool_dir, entry.key, "mobile.jpg").replace(/\134/g,"/");
    entry.pathTablet = "/" + path.join(config.pool_dir, entry.key, "tablet.jpg").replace(/\134/g,"/");
    entry.pathNormal = "/" + path.join(config.pool_dir, entry.key, "normal.jpg").replace(/\134/g,"/");
    entry.date = metaCreationDate;
    entry.meta = meta;
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

    let metaFile = path.join(shedDir, entry.key, "meta.json");
    let metaCreationDate, meta;
    if (fs.existsSync(metaFile)) {
      metaCreationDate = fs.statSync(metaFile).birthtime;
      meta = JSON.parse(fs.readFileSync(metaFile));
    }

    entry.file = entry.key + ".jpg";
    entry.route = entry.key; //meta?.custom.name || entry.key;
    entry.name = entry.meta?.ObjectName || entry.key;
    entry.article = null;
    entry.pathMobile = "/" + path.join(config.shed_dir, entry.key, "mobile.jpg").replace(/\134/g,"/");
    entry.pathTablet = "/" + path.join(config.shed_dir, entry.key, "tablet.jpg").replace(/\134/g,"/");
    entry.pathNormal = "/" + path.join(config.shed_dir, entry.key, "normal.jpg").replace(/\134/g,"/");
    entry.date = metaCreationDate;
    entry.meta = meta;
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

    let metaFile = path.join(metaDir, entry.key + ".json");
    let metaCreationDate, meta;
    if (fs.existsSync(metaFile)) {
      metaCreationDate = fs.statSync(metaFile).birthtime;
      meta = JSON.parse(fs.readFileSync(metaFile));
    }
    
    entry.route = entry.key; //meta?.custom.name || entry.key;

    let post = postsAndPages.find(p => (p && p.photographFile === entry.file));
    if (post) {
      entry.name = post.photographName;
      entry.article = {
        type: post.layout,
        date: post.date,
        title: post.title,
        subtitle: post.subTitle
      };

      let url = post.path.replace("/index.html", ""); // for posts und archives
      if (post.layout == "page") {
        url = `/${url}`.replace("//", "/").replace(".html", ""); // for archives + other pages
      }
      entry.article.url= url;

      // console.log(post.layout + " | " + post.path);
      // if (post.layout == "page") {
      //   console.log("===================");
      //   console.log(post);
      //   console.log("-----------");
      //   console.log(entry.article);
      // }
    }

    entry.pathMobile = "/" + path.join(config.photo_dir, "mobile", entry.file).replace(/\134/g,"/");
    entry.pathTablet = "/" + path.join(config.photo_dir, "tablet", entry.file).replace(/\134/g,"/");
    entry.pathNormal = "/" + path.join(config.photo_dir, "normal", entry.file).replace(/\134/g,"/");
    entry.date = metaCreationDate;
    entry.meta = meta;

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

        let key = fm.photograph.file.replace(".jpg", "");

        let metaFile = path.join(metaDir, key + ".json");
        let metaCreationDate, meta;
        if (fs.existsSync(metaFile)) {
          metaCreationDate = fs.statSync(metaFile).birthtime;
          meta = JSON.parse(fs.readFileSync(metaFile));
        }

        let entry = {
          key: key,
          status: "used",
          file: fm.photograph.file,
          route: key, //meta?.custom.name || key,
          name: fm.photograph.name,
          article: {
            type: "draft",
            date: fm.date,
            title: fm.title,
            subtitle: fm.subTitle,
            url: fm.permalink
          },
          pathMobile: "/" + path.join(config.photo_dir, "mobile", fm.photograph.file).replace(/\134/g,"/"),
          pathTablet: "/" + path.join(config.photo_dir, "tablet", fm.photograph.file).replace(/\134/g,"/"),
          pathNormal: "/" + path.join(config.photo_dir, "normal", fm.photograph.file).replace(/\134/g,"/"),
          date: metaCreationDate,
          meta: meta
        };
        
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

        let key = fm.photograph.file.replace(".jpg", "");
        
        let metaFile = path.join(metaDir, key + ".json");
        let metaCreationDate, meta;
        if (fs.existsSync(metaFile)) {
          metaCreationDate = fs.statSync(metaFile).birthtime;
          meta = JSON.parse(fs.readFileSync(metaFile));
        }

        let entry = {
          key: key,
          status: "used",
          file: fm.photograph.file,
          route: key, //meta?.custom.name || key,
          name: fm.photograph.name,
          article: {
            type: "dynamic",
            date: fm.date,
            title: fm.title,
            subtitle: fm.subTitle,
            url: fm.permalink
          },
          pathMobile: "/" + path.join(config.photo_dir, "mobile", fm.photograph.file).replace(/\134/g,"/"),
          pathTablet: "/" + path.join(config.photo_dir, "tablet", fm.photograph.file).replace(/\134/g,"/"),
          pathNormal: "/" + path.join(config.photo_dir, "normal", fm.photograph.file).replace(/\134/g,"/"),
          date: metaCreationDate,
          meta: meta
        };

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
          if (fm.photograph && !fm.photograph.keepOutOverview) {
            
            let key = fm.photograph.file.replace(".jpg", "");

            if (!used.some(e => e.key === key)) {
  
              let metaFile = path.join(metaDir, key + ".json");
              let metaCreationDate, meta;
              if (fs.existsSync(metaFile)) {
                metaCreationDate = fs.statSync(metaFile).birthtime;
                meta = JSON.parse(fs.readFileSync(metaFile));
              }
   
              let entry = {
                key: key,
                status: "used",
                file: fm.photograph.file,
                route: key, //meta?.custom.name || key,
                name: fm.photograph.name,
                article: {
                  type: "anything",
                  date: fm.date,
                  title: fm.title,
                  subtitle: fm.subTitle,
                  url: fm.permalink
                },
                pathMobile: "/" + path.join(config.photo_dir, "mobile", fm.photograph.file).replace(/\134/g,"/"),
                pathTablet: "/" + path.join(config.photo_dir, "tablet", fm.photograph.file).replace(/\134/g,"/"),
                pathNormal: "/" + path.join(config.photo_dir, "normal", fm.photograph.file).replace(/\134/g,"/"),
                date: metaCreationDate,
                meta: meta
              };
         
              used.push(entry);
            }  
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

          let key = fm.photograph.file.replace(".jpg", "");

          let metaFile = path.join(metaDir, key + ".json");
          let metaCreationDate, meta;
          if (fs.existsSync(metaFile)) {
            metaCreationDate = fs.statSync(metaFile).birthtime;
            meta = JSON.parse(fs.readFileSync(metaFile));
          }

          let entry = {
            key: key,
            status: "used",
            file: fm.photograph.file,
            route: key, //meta?.custom.name || key,
            name: fm.photograph.name,
            article: {
              type: "notes",
              date: fm.date,
              title: fm.title + " " + dir,
              url: "/notes/" + dir
            },
            pathMobile: "/" + path.join(config.photo_dir, "mobile", fm.photograph.file).replace(/\134/g,"/"),
            pathTablet: "/" + path.join(config.photo_dir, "tablet", fm.photograph.file).replace(/\134/g,"/"),
            pathNormal: "/" + path.join(config.photo_dir, "normal", fm.photograph.file).replace(/\134/g,"/"),
            date: metaCreationDate,
            meta: meta
          };

          used.push(entry);
        }
      }

      return used;

    }, []);

    log.info("-> " + magenta(notes.length) + " used photos in notes");
    return notes;
}
