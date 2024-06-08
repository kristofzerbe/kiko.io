const log = require('hexo-log')({ debug: false, silent: false });
const { magenta, magentaBright } = require('chalk');
const path = require('path');
const fs = require('hexo-fs');
const front = require('hexo-front-matter');
const axios = require('axios');
const feed2json = require('feed2json');

hexo.extend.generator.register("dynamic-blogroll", async function(locals) {
  let config = this.config;

  log.info("Processing dynamic page " + magenta("BLOGROLL") + " ...");

  let result = [];
  let promises = [];

  let page = {};
  page.name = "blogroll";

  // Get MD data
  const mdSource = path.join(config.source_dir, "_dynamic", page.name + ".md");
  const md = fs.readFileSync(mdSource);
  let fm = front.parse(md);
  page = {...page, ...fm};

  let content = page._content.replace("{% generation_date %}", new Date(Date.now()).toLocaleString('en-GB', { year:"numeric", month:"long", day:"numeric"}));
  page.content = hexo.render.renderSync({ text: content, engine: 'markdown' });

  page.items = [];

  // Get Blogroll data
  const mdBlogroll = path.join(config.data_dir, "21.13 Blogroll.md");
  const blogroll = fs.readFileSync(mdBlogroll);
  const regexp = /```cardlink\n(.*?)\n```/gs
  const matches = blogroll.matchAll(regexp);
  for (const match of matches) { 

    // convert blog's cardlink to Frontmatter for parsing
    let blog = match[0].replace("```cardlink\n", "---\n").replace("\n```", "\n---"); //.replace(/\r?\n|\r/g, ",\n");
    let fmBlog = front.parse(blog);
    delete fmBlog._content;

    page.items.push(fmBlog);
  }

  // Get latest post for every feed
  page.items.forEach(item => {

    promises.push(new Promise((resolve, reject) => {
      log.info("Request latest post from " + magentaBright(item.title));

      axios.get(item.feed, { validateStatus: () => true }).then(response => {
        feed2json.fromString(response.data, item.feed, (error, json) => {
          
          if (!error) {
            json.items.sort((a,b) => a.date_published - b.date_published).reverse();
            let feedItem = json.items[0];

            item.latest_post = {
              "url": feedItem.url,
              "title": feedItem.title,
              "date_published": feedItem.date_published
            };
        
            resolve();  
          } else {
            log.error("Parsing feed from " + item.title + " failed");
            reject();    
          }
        });
      }).catch(err => {
        log.error("Fetching feed from " + item.title + " failed");
        reject();
      });
    }));
  });

  //Resolve all promises, but avoid rejections
  return Promise.all(promises).then(function() {

    page.items.sort((a,b) => a.latest_post.date_published - b.latest_post.date_published).reverse();
  
    result.push({
      data: page,
      path: path.join(page.name, "index.html"),
      layout: "blogroll"
    });

    //TODO: Render OPML by template and add to sesult

    return result;

  }).catch((e) => { /*ignore errors*/ });

});