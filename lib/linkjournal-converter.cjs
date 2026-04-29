const fs = require("fs");
const yaml = require('js-yaml');
const path = require("path");
const handlebars = require("handlebars");
const front = require("hexo-front-matter");

const { 
  logobj,
  slugifyTitle,
  getNewDateInTimezone, 
  getCardLinkDataFromMarkdown,
  getStaticPhotographInfo
} = require("./tools.cjs");

const _currentPath = __dirname;
const _rootPath = path.join(_currentPath, "../");

class LinkJournalConverter {
  
  static yearMonth;
  static imageName;
  
  static config;
  static inboxFolder;
  static storageFolder;
  static post;

  /**
   * Converter for inbox MD's defined as link of a given year and month to a new LinkJournal post
   * @param {String} yearMonth // e.g. 2026-03
   * @param {String} poolImageName // e.g. D50_6820_2509
   */
  constructor(yearMonth, poolImageName) {
    this.yearMonth = yearMonth;
    this.poolImageName = poolImageName;

    // Read Hexo config.yaml
    this.config = yaml.load(fs.readFileSync('./_config.yml', 'utf8'));

    this.inboxFolder = this.config.linkjournal.absolute_folder_inbox;
    if (!fs.existsSync(this.inboxFolder)) { throw "Inbox folder not found"; }

    this.storageFolder = this.config.linkjournal.absolute_folder_storage;
    if (!fs.existsSync(this.storageFolder)) { throw "Storage folder not found"; }

    let outputFolder = path.join(_rootPath, this.config.source_dir, "_posts", new Date().getFullYear().toString());
    if (!fs.existsSync(outputFolder)) { throw "Output folder not found"; }
    
    // Initialize new post
    let title = "Link Journal " + yearMonth;
    let key = slugifyTitle(title);
    this.post = {
      title: title,
      key: key,
      date: getNewDateInTimezone().replace(/T/, ' ').replace(/\..+/, ''),
      _folderPath: path.join(outputFolder, key),
      _filePath: path.join(outputFolder, key + ".md"),
      items: []
    }
  }

  /**
   * Start conversion
   */
  convert() {

    // Get MD link files for the given month and year
    const files = fs.readdirSync(this.inboxFolder)
      .filter(file => fs.statSync(path.join(this.inboxFolder, file)).isFile())
      .filter(file => file.startsWith(this.yearMonth));

    files.forEach(file => {
      //console.log(file);

      // Read meta
      let md = fs.readFileSync(path.join(this.inboxFolder, file), 'utf8');
      let fm = front.parse(md);
      //console.log(fm);
      if (fm.link) {
        let fullTitle = path.parse(file).name;
        let link = {
          journal: this.post.key,
          key: slugifyTitle(fullTitle),
          title: path.parse(fullTitle).name.substring(9),
          created: new Date(fm.created).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
          tags: fm.tags
        }

        // Read content: cardlink
        let cardlink = getCardLinkDataFromMarkdown(fm._content, this.config.favicon_service_url);
        if(cardlink[0]?.title) {
          cardlink[0].titleOriginal = cardlink[0].title;
          delete cardlink[0].title;
        }
        link = {...link, ...cardlink[0]};

        // Add link to post
        this.post.items.push(link);

        //TODO: Move file to storage
      }
    });

    if (this.post.items.length === 0) {
      console.error("No links to process");
      return;
    }

    // ? Sort items by created date ascending
    this.post.items.sort((a,b) => new Date(b.date) - new Date(a.date));

    // Set photograph for the post
    let photosDir = path.join(_rootPath, this.config.static_dir, this.config.photo_dir);
    let staticDir = path.join(_rootPath, this.config.static_dir, this.config.pool_dir);
    this.post.photograph = getStaticPhotographInfo(staticDir, this.poolImageName, photosDir);

    //TEST: Move photograph to PHOTOS
    // fs.renameSync(_post.photograph.io.meta.in, _post.photograph.io.meta.out);
    // fs.renameSync(_post.photograph.io.mobile.in, _post.photograph.io.mobile.out);
    // fs.renameSync(_post.photograph.io.normal.in, _post.photograph.io.normal.out);

    //TODO: Generate post from Handlebars template
    let content = "";

    //TODO: Store new post
    // fs.writeFile(this.post._filePath, content, (err) => {
    //   if(err) { console.error(err); }
    // });

    //TODO: Write links to static/linkjournal.json

    logobj(this.post);
  }
}
module.exports.LinkJournalConverter = LinkJournalConverter;