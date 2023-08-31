const { JSDOM } = require("jsdom");

hexo.extend.helper.register('excerpt_plain', function(excerpt){

  const dom = new JSDOM('<!DOCTYPE html>');
  let e = dom.window.document.createElement("div");
  e.innerHTML = excerpt;
  return e.textContent || e.innerText;

});