'use strict';

/**
 * node "./lib/_once_transfer_tiny-tools.js"
 */

const axios = require('axios');
const path = require('path');
const fs = require('hexo-fs');
const front = require('hexo-front-matter');

const boardUrl = "https://trello.com/b/D6zIhLus/collections.json?fields=all&cards=all&card_fields=all&card_attachments=true&lists=all&list_fields=all";
const listName = "TinyTools";

const _currentPath = __dirname;
const dataFolder = "../data/21.14 Tiny Tools";
const _mdFolder = path.join(_currentPath, dataFolder);
const _imageFolder = path.join(_currentPath, dataFolder, "_attachments");

axios.get(boardUrl).then(response => {
  let json = response.data;

  let list = json.lists.filter(l => {
    return l.name === listName;
  });

  let listId = list[0].id;

  let cards = json.cards.filter(c => {
    return c.idList === listId;
  });

  cards.sort(function(a, b) {
    return new Date(b.dateLastActivity) - new Date(a.dateLastActivity);
  });

  // cards.forEach(element => {
  //   console.log(element);
  // });
  // return;

  cards.forEach(card => {
    if (card.closed === false && card.labels.length > 0) {

      let item = {
        "title": card.name.replace(/[:]+/g, ' -'),
        "description": card.desc,
        "date": card.dateLastActivity
      };

      item.labels = card.labels.map(l => {
        return l.name;
      });

      card.attachments.forEach(attachment => {

        if (attachment.url.includes(attachment.name) && attachment.bytes === null) {
          item.link = attachment.url;
        } 

        if (attachment.mimeType.startsWith("image/") && attachment.id !== null && attachment.id === card.idAttachmentCover) {
          item.imageUrl = attachment.url;
          item.imageName = card.name.toLowerCase()
            .replace(/[ .]+/g, '-') //replace space and dot with hyphen
            .replace(/[^\w-]+/g, '') //remove special chars
            .replace(/-{2,}/g, '-') //replace multiple hyhens
            + "." + attachment.fileName.split('.').pop(); //add extension
          item.imagePath = path.join(_imageFolder, item.imageName);

          if (!fs.existsSync(item.imagePath)) {
            axios({ method: "GET", url: item.imageUrl, responseType: "stream" }).then(res => {
              res.data.pipe(fs.createWriteStream(item.imagePath));
            });
          };
        }
      });

      //console.log(item);

      let content = `---
created: ${item.date}
tags: ${item.labels.map(label => `\n  - ${label}`).join("")}
title: ${item.title}
url: ${item.link}
---
\`\`\`meta-bind
INPUT[TAGS-Tiny-Tools][:tags]
\`\`\`

___
${item.description}
___

![](_attachments/${item.imageName})
`;

      //console.log(content);

      item.mdName = card.name
        .replace(/[|]+/g, '-') //replace pipe with hyphen
        .replace(/[^\w-. ]+/g, '') //remove special chars
        .replace(/ {2,}/g, ' ') //replace multiple spaces
        + ".md"

      item.mdPath = path.join(_mdFolder, item.mdName);

      fs.writeFile(item.mdPath, content, err => {
        if (err) { console.error(err); }
      });

    }
  });

});