const log = require('hexo-log')({ debug: false, silent: false });
const path = require('path');
const fs = require('hexo-fs');
const front = require('hexo-front-matter');
const axios = require('axios');

hexo.extend.generator.register("dynamic-trello", async function(locals) {
  let config = this.config;

  if (config.offline === true) { return null; }

  let promises = [];
  let result = [];
  
  // Level 1: Process boards configured
  config.trello.boards.forEach(board => {

    // Collect Promises to resolve later
    promises.push(new Promise((resolve, reject) => {
      log.info("Trello: Fetching data from board '" + board.name.toUpperCase() + "'");

      axios.get(board.url).then(response => {
        let json = response.data;
  
        // Level 2: Process pages (lists) configured in board
        board.pages.forEach(page => {
          log.info("Trello: Processing '" + page.name.toUpperCase() + "'");
    
          // Get MD data for list
          const mdSource = path.join(config.source_dir, "_dynamic", page.name + ".md");
          const md = fs.readFileSync(mdSource);
          let fm = front.parse(md);
          page = {...page, ...fm};

          // Convert Markdown content into HTML
          page.content = hexo.render.renderSync({ text: page._content, engine: 'markdown' });

          // Get list id to filter cards
          let list = json.lists.filter(l => {
            return l.name === page.list;
          });
          let listId = 0;
          if (list && list.length === 1) {
            listId = list[0].id;
          } else { reject(); } // Exit, if list not found

          // Filter cards by list id
          let cards = json.cards.filter(c => {
            return c.idList === listId;
          });

          // Sort cards by dateLastActivity
          cards.sort(function(a, b) {
            return new Date(b.dateLastActivity) - new Date(a.dateLastActivity);
          });

          // Create new item objects out of cards, 
          // if not closed and with at least one label
          page.items = cards.reduce((reducer, card) => {
            if (card.closed === false && card.labels.length > 0) {

              // Basics
              let item = {
                "name": card.name,
                "description": card.desc,
                "dateLastActivity": card.dateLastActivity,
                "position": card.pos,
                "id": card.idShort
              }

              // Labels
              item.labels = card.labels.map(l => {
                return l.name
              }); 

              // Attachments
              card.attachments.forEach(attachment => {
                // ... Link
                if (attachment.url.includes(attachment.name) && attachment.bytes === null) {
                  item.link = attachment.url;
                } 

                // ... Image (Cover)
                if (attachment.id !== null && attachment.id === card.idAttachmentCover && attachment.mimeType.startsWith("image/")) {
                  var preview = attachment.previews.filter(p => {
                    return p.width === 300;
                  });
                  if (preview.length > 0) {
                    item.image = {
                      "fileName": attachment.fileName,
                      "url": preview[0].url,
                      "width": preview[0].width,
                      "height": preview[0].height
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
            path: path.join(board.name.toLowerCase(), page.name, "index.html"),
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
