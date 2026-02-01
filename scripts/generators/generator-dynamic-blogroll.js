const log = require('hexo-log')({ debug: false, silent: false });
const { magenta } = require('chalk');
const path = require('path');
//const axios = require('axios');
const fs = require("hexo-fs");
const feed2json = require('feed2json');
const handlebars = require("handlebars");
const { getHelpers, getCustomUA, getDeltaFromToday } = require("../../lib/tools.cjs");

const _helpers = getHelpers(hexo);
const _rootDir = hexo.source_dir.replace("source", "");

hexo.extend.generator.register("dynamic-blogroll", async function(locals) {
  const config = this.config;
  
  if(hexo.status === "offline") { 
    log.error("NO NETWORK CONNECTION FOR BLOGROLL GENERATION");
    return null;
  }

  if(hexo.config.features_available.blogroll === false) { 
    log.warn("FEATURE BLOGROLL GENERATION SKIPPED");
    return null;
  }

  let page = locals.dynamic.blogroll;

  log.info("Generating Dynamic Page " + magenta("BLOGROLL") + " for " + magenta(page.items.length + " blogs") + " ...");

  page.content = page.content
    .replaceAll("{% blogroll_length %}", page.items.length)
    .replaceAll("{% blogroll_path %}", config.blogroll.opml_path)
    .replaceAll("{% generation_date %}", _helpers.moment().format("dddd, DD MMMM YYYY hh:mm"));

  //let promises = [];

  //const customUA = getCustomUA(config);

  const feedDir = path.join(_rootDir, config.data_dir, config.blogroll.data_path, config.blogroll.data_feed_path);

  // Get latest post for every feed
  page.items.forEach(item => {
    //console.log(item);

    const feedFile = path.join(feedDir, item.host.replaceAll(".", "-") + ".xml");

    if (fs.existsSync(feedFile)) { 
      //console.log(feedFile);
      let feedStats = fs.statSync(feedFile)
      if (feedStats.size > 1024) {
        item.feedSize = `${(feedStats.size / 1024).toFixed(2)} MB`;
      } else {
        item.feedSize = `${feedStats.size.toFixed(2)} KB`
      }

      let feedContent = fs.readFileSync(feedFile);

      feed2json.fromString(feedContent, item.feed, (error, json) => {
        if (!error) {
          json.items.sort((a,b) => _helpers.moment(a.date_published).diff(b.date_published)).reverse();

          item.feedLength = json.items.length;
          
          let feedItem = json.items[0];
          if (feedItem) {
            item.latest_post = {
              "url": feedItem.url,
              "title": feedItem.title || "- no title -",
              "date_published": feedItem.date_published,
              "today_delta": getDeltaFromToday(feedItem.date_published)
            };
            // console.log(feedItem.date_published + " > " + getDeltaFromToday(feedItem.date_published));
            // console.log(item.title + ": " + item.latest_post.title);  
          }
        } else {
          log.error("Parsing feed from " + item.title + " failed");
        }
      });  

    }

    // promises.push(new Promise((resolve, reject) => {
    //   //log.info("Request latest post from " + blue(item.title));

    //   axios.get(item.feed, { 
    //     validateStatus: () => true,
    //     headers: { 'User-Agent': customUA } 
    //   }).then(response => {
    //     const contentLen = response.headers?.['content-length'];
    //     const dataLen = response.data.length;
    //     const feedSize = (contentLen || dataLen) / 1024;
    //     if (feedSize > 1024) {
    //       item.feedSize = `${(feedSize / 1024).toFixed(2)} MB`;
    //     } else {
    //       item.feedSize = `${feedSize.toFixed(2)} KB`
    //     }
    //     //console.log(item.title + ": " + item.feedSize);
    //     //console.log(response.status);
        
    //     if (response.status === 200) {
    //       feed2json.fromString(response.data, item.feed, (error, json) => {
          
    //         if (!error) {
    //           // json.items.sort((a,b) => a.date_published - b.date_published).reverse();
    //           json.items.sort((a,b) => _helpers.moment(a.date_published).diff(b.date_published)).reverse();
  
    //           item.feedLength = json.items.length;
              
    //           let feedItem = json.items[0];
    //           if (feedItem) {
    //             item.latest_post = {
    //               "url": feedItem.url,
    //               "title": feedItem.title || "- no title -",
    //               "date_published": feedItem.date_published,
    //               "today_delta": getDeltaFromToday(feedItem.date_published)
    //             };
    //             //console.log(feedItem.date_published + " > " + getDeltaFromToday(feedItem.date_published));
    //             //console.log(item.title + ": " + item.latest_post.title);  
    //           }
    //         } else {
    //           log.error("Parsing feed from " + item.title + " failed");
    //         }
    //       });  
    //     } else {
    //       log.error("Fetching feed from " + item.title + " responded with status " + response.status);
    //       item.errorStatus = response.status;
    //       if (item.errorStatus === 403) {
    //         //console.log(response); 
    //       }
    //     }
    //     resolve(); 
    //   }).catch(err => {
    //     log.error("Fetching feed from " + item.title + " failed");
    //     //console.log(err);
    //     resolve(); // Resolve anyway, to suppress errors
    //   });
    // }));
  });

  let result = [];

  // Resolve all promises
  //return Promise.all(promises).then(function() {

    // Render Blogroll
    result.push({
      path: path.join(page.permalink, "index.html"),
      data: page,
      layout: "blogroll"
    });

    // Render Blogroll OPML by template and add to result
    log.info("Generating File " + magenta(config.blogroll.opml_path));

    const opmlTemplate = path.join(_rootDir, config.template_dir, config.blogroll.opml_template);
    if (!fs.existsSync(opmlTemplate)) { throw "Blogroll OPML template file not found"; }

    handlebars.registerHelper('toISOString', function(number) {
      return number.toISOString()
    })
    
    const opmlSource = fs.readFileSync(opmlTemplate).toString('utf8');
    const opml = handlebars.compile(opmlSource);
    const opmlResult = opml(page);

    result.push({
      path: config.blogroll.opml_path,
      data: opmlResult
    });

    return result;
  //});

});