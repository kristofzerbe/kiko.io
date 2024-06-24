const log = require('hexo-log')({ debug: false, silent: false });
const { magenta, blue } = require('chalk');
const path = require('path');
const axios = require('axios');
const feed2json = require('feed2json');

hexo.extend.generator.register("dynamic-blogroll", async function(locals) {
  log.info("Generating Dynamic Page " + magenta("BLOGROLL") + " ...");

  let page = locals.dynamic.blogroll;

  let promises = [];

  // Get latest post for every feed
  page.items.forEach(item => {

    promises.push(new Promise((resolve, reject) => {
      log.info("Request latest post from " + blue(item.title));

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
          } else {
            log.error("Parsing feed from " + item.title + " failed");
          }
        });
        resolve(); 
      }).catch(err => {
        log.error("Fetching feed from " + item.title + " failed");
        resolve(); // Resolve anyway, to suppress errors
      });
    }));
  });

  let result = [];

  // Resolve all promises
  return Promise.all(promises).then(function() {

    page.items.sort((a,b) => a.latest_post?.date_published - b.latest_post?.date_published).reverse();
  
    result.push({
      data: page,
      path: path.join(page.name, "index.html"),
      layout: "blogroll"
    });

    //TODO: Render OPML by template and add to result

    return result;
  });

});