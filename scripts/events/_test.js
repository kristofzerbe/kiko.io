const log = require("hexo-log")({ debug: false, silent: false });
const { red } = require("chalk");

hexo.on('ready', function(){
  log.info(red(">>> ready ------------------------------------------------------"));
  console.log(hexo.env);
});

hexo.on('generateBefore', function(){
  log.info(red(">>> generateBefore ---------------------------------------------"));
  // console.log(this.pages);
  // console.log(this.locals.get("pages"));
  // console.log(this.locals.get("posts"));
  // const posts = this.locals.get("posts")
  //   .filter(item => item.isLocale || item.hasLocale)
  //   .map(
  //     ({ slug, title, source, path, permalink, isLocale, hasLocale }) => 
  //     ({ slug, title, source, path, permalink, isLocale, hasLocale })
  //   );
  // console.log(posts);
});

hexo.extend.filter.register('before_generate', function() {
  log.info(red(">>> filter > before_generate -----------------------------------"));
  // console.log(this);
});

hexo.on('generateAfter', function(){
  log.info(red(">>> generateAfter ----------------------------------------------"));
  //console.log(this);
});

hexo.on('exit', function(){
//  log.info(red(">>> exit ======================================================="));

});

/* ??? */

hexo.on('processBefore', function(){
  log.info(red(">>> processBefore ----------------------------------------------"));
});

hexo.on('processAfter', function(){
  log.info(red(">>> processAfter -----------------------------------------------"));
});