const log = require('hexo-log')({ debug: false, silent: false });
const { magenta } = require('chalk');
const path = require('path');
const { getMD } = require("../../lib/tools.cjs");

hexo.on('generateBefore', function() {
  log.info("Getting Dynamic Page " + magenta("STATS") + " ...");

  const config = this.config;

  let pages = {};


  let page = { name: "stats" };
  page = getMD(hexo, path.join("_dynamic", page.name + ".md"), page);
  //... TODO
  pages.stats = page;


  let music = { name: "stats-music" };
  music = getMD(hexo, path.join("_dynamic", music.name + ".md"), music);
  //... TODO
  pages.stats_music = music;

  
  let links = { name: "stats-links" };
  links = getMD(hexo, path.join("_dynamic", links.name + ".md"), links);
  //... TODO
  pages.stats_links = links;


  let dyn = {...hexo.locals.get('dynamic'), ...pages};
  hexo.locals.set('dynamic', dyn);

  // console.log(hexo.locals.get('dynamic'));
});