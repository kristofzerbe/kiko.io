const log = require('hexo-log')({ debug: false, silent: false });
const { magenta } = require('chalk');
const path = require('path');
const fs = require('hexo-fs');
const front = require('hexo-front-matter');
const axios = require('axios');
const feed2json = require('feed2json');

hexo.extend.generator.register("dynamic-blogroll", async function(locals) {
  let config = this.config;

  log.info("Processing dynamic page " + magenta("BLOGROLL") + " ...");

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
   
    //TODO: Fetch feed and get latest post
    // ...

    promises.push(new Promise((resolve, reject) => {
      log.info("Request latest item from feed of " + fmBlog.title);

      axios.get(fmBlog.feed, { validateStatus: () => true }).then(response => {
        feed2json.fromString(response.data, fmBlog.feed, (error, json) => {
          
          if (!error) {
            json.items.sort((a,b) => a.date_published - b.date_published).reverse();
            let feedItem = json.items[0];

            fmBlog.latest_post = {
              "url": feedItem.url,
              "title": feedItem.title,
              "date_published": feedItem.date_published
            };

            page.items.push(fmBlog);
        
            resolve();  
          } else {
            log.error("Parsing feed from " + fmBlog.title + " failed");
            reject();    
          }
        });
      }).catch(err => {
        log.error("Fetching feed from " + fmBlog.title + " failed");
        reject();
      });
    }));
  }

  //Resolve all promises
  return Promise.all(promises).then(function() {

    // shuffle(page.items);
    page.items.sort((a,b) => a.latest_post.date_published - b.latest_post.date_published).reverse();
  
    let result = {
      data: page,
      path: path.join(page.name, "index.html"),
      layout: "blogroll"
    };

    return result;
  });

});

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}