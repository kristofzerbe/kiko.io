const { JSDOM } = require("jsdom");

hexo.extend.helper.register('excerpt_plain', function(excerpt){

  const dom = new JSDOM('<!DOCTYPE html>');
  var tmp = dom.window.document.createElement("div");
  tmp.innerHTML = excerpt;
  return tmp.textContent || tmp.innerText;

});