const log = require('hexo-log')({ debug: false, silent: false });
const { magenta, blue } = require('chalk');
const path = require('path');
const axios = require('axios');
const fs = require("hexo-fs");
const feed2json = require('feed2json');
const handlebars = require("handlebars");
const { getHelpers } = require("../../../lib/tools.cjs");

const _helpers = getHelpers(hexo);
const _rootDir = hexo.source_dir.replace("source", "");

hexo.extend.generator.register("dynamic-blogroll", async function(locals) {
  log.info("Generating Dynamic Page " + magenta("BLOGROLL") + " ...");

  const config = this.config;

  let page = locals.dynamic.blogroll;

  page.content = page.content.replace("{% generation_date %}", _helpers.moment().format("dddd, DD MMMM YYYY hh:mm"));

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
      path: path.join(page.name, "index.html"),
      data: page,
      layout: "blogroll"
    });

    //Render OPML by template and add to result
    const opmlTemplate = path.join(_rootDir, config.template_dir, "opml.handlebars");
    if (!fs.existsSync(opmlTemplate)) { throw "OPML Template file not found"; }

    const opmlSource = fs.readFileSync(opmlTemplate).toString('utf8');
    const opml = handlebars.compile(opmlSource);
    const opmlResult = opml(page);

    result.push({
      path: "blogroll.opml",
      data: opmlResult
    });

    return result;
  });

});