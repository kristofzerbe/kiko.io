const log = require('hexo-log')({ debug: false, silent: false });
const { magenta } = require('chalk');
const path = require('path');
const fs = require('hexo-fs');
const front = require('hexo-front-matter');
const axios = require('axios');
// const { isInternetAvailable } = require('is-internet-available');

//TODO: Switch from Trello to Obsidian

hexo.extend.generator.register("dynamic-trello", async function(locals) {
  return;
  const config = this.config;

  if(hexo.status === "offline") { 
    log.error("NO NETWORK CONNECTION FOR TRELLO GENERATION");
    return null;
  }
  if(hexo.config.features_available.trello === false) { 
    log.warn("FEATURE TRELLO GENERATION SKIPPED");
    return null;
  }

  const helpers = Object.keys(hexo.extend.helper.store).reduce((result, name) => {
    result[name] = hexo.extend.helper.get(name).bind({ ...hexo, page: {} });
    return result;
  }, {});

  let promises = [];
  let result = [];
  
  // Level 1: Process boards configured
  config.trello.boards.forEach(board => {

    log.info("Retreiving Trello board '" + board.name + "'");

    // Collect Promises to resolve later
    promises.push(new Promise((resolve, reject) => {
      //log.info("Fetching Trello data from board " + magenta(board.name.toUpperCase()));

      // Get board data from Trello
      axios.get(board.url).then(response => {
        let json = response.data;
  
        // Level 2: Process pages (lists) configured in board
        board.pages.forEach(page => {
          log.info("Generating Dynamic Page " + magenta(page.name.toUpperCase()) + " from Trello list '" + page.list + "'");
    
          // Get MD data for list
          const mdSource = path.join(config.source_dir, "_dynamic", page.name + ".md");
          const md = fs.readFileSync(mdSource);
          let fm = front.parse(md);
          page = {...page, ...fm};

          // Convert Markdown content into HTML
          page.content = hexo.render.renderSync({ text: page._content, engine: 'markdown' });
          page.updated = helpers.moment();

          // Get list id to filter cards
          let list = json.lists.filter(l => {
            return l.name === page.list;
          });
          // console.log(list);
          let listId = 0;
          if (list && list.length === 1) {
            listId = list[0].id;
          } else { reject(); } // Exit, if list not found

          // Filter cards by list id
          let cards = json.cards.filter(c => {
            return c.idList === listId;
          });
          // console.log(cards);

          // Sort cards by dateLastActivity
          cards.sort(function(a, b) {
            return new Date(b.dateLastActivity) - new Date(a.dateLastActivity);
          });

          // Create new item objects out of cards, if not closed and without labels
          page.items = cards.reduce((reducer, card) => {
            if (card.closed === false && card.labels.length > 0) {

              // Basics
              let item = {
                "name": card.name,
                "description": card.desc,
                "dateLastActivity": card.dateLastActivity,
                "position": card.pos,
                "id": card.idShort
              };
              // console.log(item);

              // Labels
              item.labels = card.labels.map(l => {
                return l.name;
              }); 

              // Attachments
              card.attachments.forEach(attachment => {
                // ... Link
                if (attachment.url.includes(attachment.name) && attachment.bytes === null) {
                  item.link = attachment.url;
                } 
                // console.log(attachment);

                // ... Image (Cover)
                if (attachment.id !== null && attachment.id === card.idAttachmentCover && attachment.mimeType.startsWith("image/")) {
                  var preview = attachment.previews.filter(p => {
                    return p.width === page.preview_width;
                  });
                  if (preview.length > 0) {                    
                    const localFilename = card.name.toLowerCase()
                      .replace(/ /g, '-') //replace space with hyphen
                      .replace(/[^\w-]+/g, '') //remove special chars
                      .replace(/-{2,}/g, '-') + //replace multiple hyhens
                      "." + attachment.fileName.split('.').pop(); //add extension
                    const localImagePath = path.join(config.static_dir, "images", "trello", localFilename);
                    // console.log(localImagePath);

                    if (fs.existsSync(localImagePath)) {
                      item.image = {
                        "fileName": localFilename,
                        "url": config.root + "images/trello/" + localFilename
                      };
                    } else {                      
                      axios({ method: "GET", url: preview[0].url, responseType: "stream" }).then(res => {
                        res.data.pipe(fs.createWriteStream(localImagePath));
                        log.info("Trello Image Download: " + magenta(localImagePath));
                      });
                      // WORKAROUND: take Trello data on first use -> image will be available only on next generation run
                      item.image = {
                        "fileName": attachment.fileName,
                        "url": preview[0].url,
                      };
  
                    }
                  }
                }
              });
              reducer.push(item);
            }
            return reducer;
          }, []);

          // Create unique label array out of item.labels
          page.labels = [];
          page.items.map( item => {
            page.labels = [...new Set([...page.labels, ...item.labels])].sort();
          });

          // Add page to generator result
          result.push({
            data: page,
            //path: path.join(board.name.toLowerCase(), page.name, "index.html"),
            path: path.join(page.permalink, "index.html"),
            layout: "trello-list"
          });

          resolve();
        });
    
      });
    }));

  });

  //Resolve all promises
  return Promise.all(promises).then(function() {
    return result;
  });

});
