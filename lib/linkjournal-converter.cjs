const fs = require("fs");
const yaml = require('js-yaml');
const path = require("path");
const handlebars = require("handlebars");
const front = require("hexo-front-matter");

const { 
  logobj,
  slugifyTitle,
  getNewDateInTimezone, 
  getCardLinkMatchContent,
  getCardLinkDataFromMarkdown,
  getStaticPhotographInfo,
  getFullMonthAndYear
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
    this.period = getFullMonthAndYear(yearMonth);

    // Read Hexo config.yaml
    this.config = yaml.load(fs.readFileSync('./_config.yml', 'utf8'));

    this.inboxFolder = this.config.linkjournal.absolute_folder_inbox;
    if (!fs.existsSync(this.inboxFolder)) { throw "Inbox folder not found"; }

    if (!fs.existsSync(this.config.linkjournal.absolute_folder_storage)) { throw "Storage folder not found"; }
    this.storageFolder = path.join(this.config.linkjournal.absolute_folder_storage, yearMonth);
    if (!fs.existsSync(this.storageFolder)) { fs.mkdirSync(this.storageFolder); }
   
    let outputFolder = path.join(_rootPath, this.config.source_dir, "_posts", new Date().getFullYear().toString());
    if (!fs.existsSync(outputFolder)) { fs.mkdirSync(outputFolder); }
    
    this.templateFile = path.join(_rootPath, this.config.template_dir, this.config.linkjournal.template);
    
    // Initialize new post
    let title = "Link Journal " + yearMonth;
    let key = slugifyTitle(title);
    let photosDir = path.join(_rootPath, this.config.static_dir, this.config.photo_dir);
    let staticDir = path.join(_rootPath, this.config.static_dir, this.config.pool_dir);

    this.post = {
      _folderPath: path.join(outputFolder, key),
      _filePath: path.join(outputFolder, key + ".md"),
      period: this.period,
      title: title,
      key: key,
      date: getNewDateInTimezone().replace(/T/, ' ').replace(/\..+/, ''),
      photograph: getStaticPhotographInfo(staticDir, this.poolImageName, photosDir),
      count: 0,
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
          tags: fm.tags.join(",")
        }

        // Read content: first cardlink = post
        let cardlink = getCardLinkDataFromMarkdown(fm._content, this.config.favicon_service_url);
        if(cardlink[0]?.title) {
          cardlink[0].titleOriginal = cardlink[0].title;
          delete cardlink[0].title;
        }
        link = {...link, ...cardlink[0]};

        // generate content
        let firstCardlink = getCardLinkMatchContent(fm._content, 0);
        link.content = fm._content
          .replace(firstCardlink, "") //delete first cardlink
          .replaceAll("```", "@@@") //convert other cardlinks to dummy
          .trim()
        // console.log(link.content);

        // Add link to post
        this.post.items.push(link);
      }
    });

    if (this.post.items.length === 0) {
      console.error("No links to process");
      return;
    } else {
      this.post.count = this.post.items.length;
    }

    // ? Sort items by created date ascending
    this.post.items.sort((a,b) => new Date(b.date) - new Date(a.date));
    //logobj(this.post);

    //Generate post from Handlebars template
    let templateSource = fs.readFileSync(this.templateFile).toString('utf8');
    let templateCompiler = handlebars.compile(templateSource);
    let postContent = templateCompiler(this.post); 
    //console.log(postContent);

    //Store new post
    fs.writeFile(this.post._filePath, postContent, (err) => {
      if(err) { console.error(err); }
    });

    //Move photograph to PHOTOS
    fs.renameSync(this.post.photograph.io.meta.in, this.post.photograph.io.meta.out);
    fs.renameSync(this.post.photograph.io.mobile.in, this.post.photograph.io.mobile.out);
    fs.renameSync(this.post.photograph.io.normal.in, this.post.photograph.io.normal.out);

    //TODO: Move {files} to {this.storageFolder}

    //?TODO: Write links to static/linkjournal.json

  }
}
module.exports.LinkJournalConverter = LinkJournalConverter;