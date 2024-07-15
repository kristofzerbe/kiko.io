const photoSelector = require("../../lib/photograph-selector.cjs").Selector;

const log = require('hexo-log')({
  debug: false,
  silent: false
});

hexo.extend.filter.register('before_post_render', function(data) {
  
  if (data.layout === "post" && data.source.startsWith("_posts/")) { // posts only, no drafts
    //console.log(data.slug + ": " + data.photograph.file);

    if (!data.photograph.file) {
      log.info("Processing missing photograph on post '" + data.title + "'");

      const selector = new photoSelector();
      let photo = selector.pick();
  
      data.photograph.file = photo.file;
      data.photograph.name = photo.name;
      data.photograph.link = photo.link;  
    }
  }
  return data;
});