const fs = require("fs");
const yaml = require('js-yaml');
const path = require("path");
const axios = require("axios");
const handlebars = require("handlebars");
const { marked } = require('marked');

const photoSelector = require("./photograph-selector.cjs").Selector;

const _currentPath = __dirname;
const _rootPath = path.join(_currentPath, "../");
let _doPhoto = true;

let _config;
let _trelloUrl;
let _templateFile;

// Init new post object
let _post = {
  board: null,
  list: null
};

class DiscoveriesGenerator {

  constructor(listName, doPhoto = true) {

    _doPhoto = doPhoto;

    // Read Hexo config.yaml
    _config = yaml.load(fs.readFileSync('./_config.yml', 'utf8'));

    // Set Trello Url
    _trelloUrl = _config.discoveries.board.url;
    _trelloUrl += "?" + _config.discoveries.board.parameters.map(kv => kv.key + "=" + kv.value).join("&");

    // Set Template file for handlebars
    _templateFile = path.join(_rootPath, _config.template_dir, _config.discoveries.template);
    if (!fs.existsSync(_templateFile)) { throw "Template file not found"; }

    // Set output folder
    let outputFolder = path.join(_rootPath, _config.source_dir, "_posts", new Date().getFullYear().toString());
    if (!fs.existsSync(outputFolder)) { throw "Output folder not found"; }

    // Set main properties of new post
    _post.list = listName;
    _post.key = listName.replace(/[^\w]/g, "-").replace(/-{2,10}/g, "-"); //"Discoveries-" + discoveryNo + listName.replace(/Discoveries|[^\w]/g, "-").replace(/-{2,10}/g, "-");
    _post.title = listName;
    _post.date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    _post._folderPath = path.join(outputFolder, _post.key);
    _post._filePath = path.join(outputFolder, _post.key + ".md");
    _post.items = [];
  }

  /**
   * Generates a new discoveries post out of a Trello List
   */
  generate() {
    let self = this;
    //let url = _trelloUrl + _trelloUrlParameter;
    let downloadPromises = [];

    // Get board data from Trello
    axios.get(_trelloUrl).then(response => {
      let json = response.data;

      // Set board name
      _post.board = json.name;

      // Get list id to filter cards
      let listId = json.lists.filter(l => { return l.name === _post.list; })[0]?.id;
      if (!listId) {
        console.error("Trello list '" + _post.list + "' not found");
        return; 
      }

      // Get custom field id for Author
      let authorId = json.customFields.filter(f => { return f.name === "Author"; })[0]?.id;

      // Get active cards of list
      let cards = json.cards.filter(c => {
        return c.idList === listId && c.closed === false;
      });
      if (cards.length === 0) { 
        console.error("No cards found"); 
        return;
      }

      // Process cards ...
      cards.forEach(card => {
        let item = {
          title: card.name.replace(/[|]/g, "").replace(/ {2,10}/g, " ").trim(), //(prevent PIPE and double SPACES)
          key: card.name.toLowerCase().replace(/[^\w]/g, "-").replace(/-{2,10}/g, "-").trim(),
          description: marked.parse(card.desc).replace(/<(\/)?p>/g, "").trim(), //(parse Markdown, but remove paragraphs)
          url: null
        };

        if (item.title === "INTRO") {
          _post.intro = item.description;
          return;
        }

        //# Process Custom Fields
        // Author
        if (authorId) {
          let customField = card.customFieldItems.filter(i => { return i.idCustomField === authorId; })[0];
          if (customField) {
            item.author = customField.value.text;
          }
        }

        //# Process attachments...
        if (card.attachments) {
          card.attachments.forEach(att => {

            // Link
            if (att.bytes === null && att.mimeType === "") {
              item.url = att.name;

            // Images
            } else { 
              // Iterate to find needed preview image
              att.previews.forEach(preview => {
                if (preview.width >= 590 && preview.width <= 610) {

                  // Set image name and path
                  item.imageName = item.key + path.extname(preview.url);
                  item._imagePath = path.join(_post._folderPath, item.imageName);

                  // Queue downloading image
                  downloadPromises.push(new Promise((resolve, reject) => {
                    try { self.downloadImage(preview.url, item).then(() => { resolve(); });} 
                    catch (error) { reject(); }
                  }));
                }
              });
            }
            
          });  
        }

        // Add item to post
        _post.items.push(item);
      });

      // // If there are images to download...
      // if (downloadPromises.length > 0) {

        // Create post folder
        if (!fs.existsSync(_post._folderPath)) {
          fs.mkdirSync(_post._folderPath);
        }

        // Start downloading images first
        Promise.all(downloadPromises).then(() => {
          // ... and proceed

          // Pick new photo for post
          if (_doPhoto === true) {
            const selector = new photoSelector();
            _post.photograph = selector.pick();
          }

          // Generate post from Handlebars template
          let content = self.createPostFromTemplate(); 

          // Store new post
          fs.writeFile(_post._filePath, content, (err) => {
            if(err) { console.error(err); }
          });
      
        });

      // }

    });

  }

  /**
   * Downloads an Trello image from URL
   * @param {String} url 
   * @param {Object} item 
   */
  async downloadImage(url, item) {
    return axios.get(url, { responseType: "stream" }).then(response => {
      console.log("Downloading '" + item.imageName + "'");

      // Store downloaded image in post folder
      const writer = response.data.pipe(fs.createWriteStream(item._imagePath));
      writer.on("finish", () => { return; });
      writer.on("error", () => { console.error("Error dowloading image '" + item.imageName + "'"); });
    });
  }

  /**
   * Creates post MD file from _post with Handlebars template
   */
  createPostFromTemplate() {
    console.log("Creating post file '" + _post._filePath + "'");

    let source = fs.readFileSync(_templateFile).toString('utf8');
    let template = handlebars.compile(source);
    let md = template(_post);
    return md;
  }

}
module.exports.DiscoveriesGenerator = DiscoveriesGenerator;