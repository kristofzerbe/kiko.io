/*
    Image Masonry Tag: https://github.com/bigbite/macy.js

    Syntax:
    {% image_masonry ..."assetImg|title" %}
    
*/

const { compileHandlebar } = require("../../lib/tools.cjs");

hexo.extend.tag.register("image_masonry", function(args){
    let assetPath = this.path.replace("//", "/").replace("/de/", "/");

    if (!assetPath.startsWith("/")) {
      assetPath = "/" + assetPath;
    }

    let masonry = {
      rnd: Math.random().toString(36).substring(2,8),
      items: []
    }

    args.forEach(function(e) {
      var args = e.split("|"); 

      let item = {
        asset: assetPath + args[0],
        title: args[1]
      }

      masonry.items.push(item);
    });

    const element = compileHandlebar(hexo, "image-masonry.handlebars", masonry);
    return element;  
});