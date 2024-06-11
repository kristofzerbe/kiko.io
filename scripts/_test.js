const log = require("hexo-log")({ debug: false, silent: false });
const { red } = require("chalk");

hexo.on('ready', function(){
  log.info(red(">>> ready ------------------------------------------------------"));
  //console.log(this);
  // this.custom = {
  //   notes: [{
  //     title: "Lorem ipsum"
  //   }]
  // }
  // this.locals.set('notes', [
  //   {
  //     title: "Lorem ipsum"
  //   }
  // ])
});

hexo.on('generateBefore', function(){
  log.info(red(">>> generateBefore ---------------------------------------------"));
  // console.log(this.locals);
  // console.log(this.locals.toObject().posts);
  // console.log(this.locals.get('notes')[0]);
  // console.log(this.locals.get("posts").data[0]);
});

hexo.extend.filter.register('before_generate', function() {
  log.info(red(">>> filter > before_generate ---------------------------------------"));
  // console.log(this);
});

hexo.on('generateAfter', function(){
  log.info(red(">>> generateAfter ----------------------------------------------"));
  //console.log(this);
});

hexo.on('exit', function(){
  log.info(red(">>> exit ======================================================="));

});

/* ??? */

hexo.on('processBefore', function(){
  log.info(red(">>> processBefore ----------------------------------------------"));
});

hexo.on('processAfter', function(){
  log.info(red(">>> processAfter -----------------------------------------------"));
});