const log = require('hexo-log')({ debug: true, silent: false });
const path = require('path');
const fs = require('hexo-fs');
const front = require('hexo-front-matter');
const axios = require('axios');

hexo.extend.generator.register("trello-collections", async function(locals) {
  let config = this.config;

  let promises = [];
  let result = [];
  
  // Level 1: Process Boards
  config.trelloCollections.boards.forEach(board => {

    // Collect Promises to resolve later
    promises.push(new Promise((resolve, reject) => {
      log.info("Fetching JSON from Board '" + board.name + "'");

      axios.get(board.url).then(response => {
        let json = response.data;
  
        // Level 2: Process Pages (Lists)
        board.pages.forEach(page => {
          log.info("Processing Page '" + page.name + "'");
    
          // Get MD data for list
          const mdSource = path.join(config.source_dir, "_collections", page.name + ".md");
          const md = fs.readFileSync(mdSource);
          let collection = front.parse(md);

          // Convert Markdown content into HTML
          collection.content = hexo.render.renderSync({ text: collection._content, engine: 'markdown' });

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

          // Create new item objects out of cards, if it is not closed and has at least one label
          collection.items = cards.reduce((reducer, card) => {
            if (card.closed === false && card.labels.length > 0) {

              // Basics
              let item = {
                "name": card.name,
                "desc": card.desc,
                "dateLastActivity": card.dateLastActivity
              }

              // Labels
              item.labels = card.labels.map(l => {
                return l.name
              }); 

              // Attachments
              card.attachments.forEach(attachment => {
                // ... Link
                if (attachment.url === attachment.name && attachment.bytes === null) {
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

          //log.debug("Collection\n\n" + JSON.stringify(collection));

          // Create unique collection label array out of item.labels
          collection.labels = [];
          collection.items.map( item => {
            collection.labels = [...new Set([...collection.labels,...item.labels])].sort();
          });

          // Add page to generator result
          result.push({
            data: collection,
            path: path.join("collections", page.name, "index.html"),
            layout: "collection"
          });

          resolve();
        });
    
      });
    }));

  });

  //Resolve all promises
  return Promise.all(promises).then(function() {
    //log.debug("Result\n\n" + JSON.stringify(result));
    return result;
  });

});
