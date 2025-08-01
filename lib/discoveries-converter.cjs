const fs = require("fs");
const yaml = require('js-yaml');
const path = require("path");
const handlebars = require("handlebars");
const front = require("hexo-front-matter");

const { 
  log, 
  slugify, 
  slugifyTitle, 
  getDataFromCardlinkCodeBlock, 
  getImagesFromMarkdown 
} = require("./tools.cjs");

const _currentPath = __dirname;
const _rootPath = path.join(_currentPath, "../");

let _config;
let _photosDir;
let _dataFolder;
let _discoveriesFolder;
let _discoveriesAttachmentFolder;
let _discoveriesFile;
let _templateFile;
let _post;

class DiscoveriesConverter {

  constructor(folderName) {

    // Read Hexo config.yaml
    _config = yaml.load(fs.readFileSync('./_config.yml', 'utf8'));

    // Set data folder
    _dataFolder = path.join(_rootPath, _config.data_dir, _config.discoveries.data_folder);
    _discoveriesFolder = path.join(_dataFolder, folderName);
    _discoveriesAttachmentFolder = path.join(_discoveriesFolder, "_attachments");
    _discoveriesFile = path.join(_discoveriesFolder, folderName + ".md");
    if (!fs.existsSync(_discoveriesFile)) { throw "Discoveries not found"; }

    // Set photo dir
    _photosDir = path.join(_rootPath, _config.static_dir, _config.photo_dir)

    // Set template file for Handlebars
    _templateFile = path.join(_rootPath, _config.template_dir, _config.discoveries.template);
    if (!fs.existsSync(_templateFile)) { throw "Template file not found"; }
//console.log(_templateFile);

    // Set output folder
    let outputFolder = path.join(_rootPath, _config.source_dir, "_posts", new Date().getFullYear().toString());
    if (!fs.existsSync(outputFolder)) { throw "Output folder not found"; }

    // Init new post object
    _post = {};

    // Set main properties of new post
    _post.title = "Discoveries #" + folderName;
    _post.key = slugifyTitle(_post.title);
    _post.date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    _post._folderPath = path.join(outputFolder, _post.key);
    _post._filePath = path.join(outputFolder, _post.key + ".md");
    _post.items = [];
 //console.log(_post);   
  }

  /**
   * Converts an Obsidian subfolder into a new discoveries post
   */
  convert() {

    // Read Discovery file and parse Frontmatter
    let md = fs.readFileSync(_discoveriesFile, 'utf8');
    let fm = front.parse(md);

    // Set photograph for the post
    let photoDir = path.join(_rootPath, _config.static_dir, _config.reserve_dir, fm.hero);
    if (!fs.existsSync(path.join(photoDir, "meta.json"))) { throw "Photo (meta) not found"; }
    let photoMetaFile = fs.readFileSync(path.join(photoDir, "meta.json"));
    let photoMeta = JSON.parse(photoMetaFile);
    _post.photograph = {
      file: fm.hero + ".jpg",
      name: photoMeta.ObjectName,
      io: {
        meta: {
          in: path.join(photoDir, "meta.json"),
          out: path.join(_photosDir, "meta", fm.hero + ".json")
        },
        mobile: {
          in: path.join(photoDir, "mobile.jpg"),
          out: path.join(_photosDir, "mobile", fm.hero + ".jpg")
        },
        normal: {
          in: path.join(photoDir, "normal.jpg"),
          out: path.join(_photosDir, "normal", fm.hero + ".jpg")
        },
        tablet: {
          in: path.join(photoDir, "tablet.jpg"),
          out: path.join(_photosDir, "tablet", fm.hero + ".jpg")
        }
      }
    };
//console.log(_post.photograph);

    // Get intro as Markdown
    const regexIntro = /---\n(?<intro>.*?)\n---/gs
    const resultIntro = regexIntro.exec(fm._content);
    _post.intro = resultIntro?.groups?.intro.trim();
//console.log(_post.intro);

    // Get items from content
    const regexLinks = /\[\[(.*)\]\]/g
    let matchesLinks = fm._content.matchAll(regexLinks);
    _post.items = [...matchesLinks].map(link => { 
//console.log("ITEM: =========================================================")      
      return this.getItem(link[1]); 
    });
//console.log(_post.items);

    // Create post folder
    if (!fs.existsSync(_post._folderPath)) {
      fs.mkdirSync(_post._folderPath);
    }

    // Generate post from Handlebars template
    console.log("Creating post file '" + _post._filePath + "'");
    let source = fs.readFileSync(_templateFile).toString('utf8');
    let template = handlebars.compile(source);
    let content = template(_post); 
//console.log(content);

    // Store new post
    fs.writeFile(_post._filePath, content, (err) => {
      if(err) { console.error(err); }
    });

    // Copy item attachments to post folder and move to Discovery folder
    if (!fs.existsSync(_discoveriesAttachmentFolder)) {
      fs.mkdirSync(_discoveriesAttachmentFolder, { recursive: true });
    }
    _post.items.forEach(item => {
      item.attachments.forEach(attachment => {
        fs.copyFileSync(attachment.io.in, attachment.io.out.copy);
        fs.renameSync(attachment.io.in, attachment.io.out.move);
      });
    });

    // Move photograph to PHOTOS
    fs.renameSync(_post.photograph.io.meta.in, _post.photograph.io.meta.out);
    fs.renameSync(_post.photograph.io.mobile.in, _post.photograph.io.mobile.out);
    fs.renameSync(_post.photograph.io.normal.in, _post.photograph.io.normal.out);
    fs.renameSync(_post.photograph.io.tablet.in, _post.photograph.io.tablet.out);

    log(_post);
    // return;
  }

  getItem(link) {

    // Get link file & parse Frontmatter
    let linkFile = path.join(_discoveriesFolder, link + ".md");
    let md = fs.readFileSync(linkFile, 'utf8');
    let fm = front.parse(md);
//console.log(linkFile);
//console.log(fm);

    // Init new link object
    let item = {
      title: link,
      key: fm.slug ?? slugify(link),
      author: fm.author,
      content: fm._content
    };

    // Get CardLink data from content
    const regexCardlink = /^```cardlink\n([\s\S]*?)\n```$/gm;
    const resultCardLink = regexCardlink.exec(item.content);
    if (resultCardLink) {
      item.cardlink = getDataFromCardlinkCodeBlock(resultCardLink[0], _config.favicon_service_url);
    }
    item.content = item.content.replace(regexCardlink, `@@@cardlink\n$1\n@@@`); // replace to prevent Hexo from treating the block as code

    // Get attachment image(s) from content
    let imageAttachments = getImagesFromMarkdown(fm._content);
    item.attachments = imageAttachments.map(img => { 
      let a = this.getAttachment(img.url);
      item.content = item.content.replace(`![[${img.url}]]`, `![](/post/${_post.key}/${a.file})`);
      item.content = item.content.replace(`![${img.caption}](${img.url})`, `![${img.caption}](/post/${_post.key}/${a.file})`);
      item.content = item.content.trim();
      return a;
    });
console.log(item);
    return item;
  }

  getAttachment(attachment) {  
    let file = attachment.substring(attachment.lastIndexOf('/') + 1); 
    return {
      file: file,
      io: {
        in: path.join(_dataFolder, "_attachments", file),
        out: {
          copy: path.join(_post._folderPath, file),
          move: path.join(_discoveriesAttachmentFolder, file)
        }
      }
    };
  }

}
module.exports.DiscoveriesConverter = DiscoveriesConverter;