const log = require('hexo-log')({ debug: false, silent: false });
const { magenta } = require('chalk');
const path = require('path');

hexo.extend.generator.register("dynamic-concerts", async function(locals) {
  log.info("Generating Dynamic Page " + magenta("CONCERTS") + " ...");

  let page = locals.dynamic.concerts;

  page.items.forEach(item => {
    if(item.post) {
      let slug = item.post;
      let post = locals.posts.data.filter((p) => p.slug === slug );
//console.log(post);
      item.post = {
        slug: slug,
        title: post[0].title,
        description: post[0].subtitle
      }
      // console.log(item);
    }
  });

  page.content = page.content
    .replace("{% concert.count %}", page.items.length);

  return {
    path: path.join(page.permalink, "index.html"),
    data: page,
    layout: "concerts"
  };

});
