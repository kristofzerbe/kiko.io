const fs = require("fs");
const yaml = require('js-yaml');
const path = require("path");
const front = require("hexo-front-matter");
const moment = require("moment");
const { getCardLinkDataFromMarkdown, getImagesFromMarkdown } = require("./tools.cjs");

const _currentPath = __dirname;
const _rootPath = path.join(_currentPath, "../");

let _config;
let _ttDir;
let _tt;

class TinyToolsGenerator {
  
  constructor() {

    _config = yaml.load(fs.readFileSync('./_config.yml', 'utf8'));
    _ttDir = path.join(_rootPath, _config.data_dir, _config.tiny_tools.data_folder);
    //console.log(_ttDir);

    _tt = fs
      .readdirSync(_ttDir)
      .filter((entry) => fs.statSync(path.join(_ttDir, entry)).isFile())
      .filter((entry) => !entry.startsWith(_config.tiny_tools.data_folder))
      // .filter((file) => file.match(/\d{2}-\d{2}-.*.md/g))
      .map((entry) => ({
        file: entry,
        name: entry.replace(".md", ""),
        path: path.join(_ttDir, entry)
      })
    );
  }

  generate() {
    let result = [];

    _tt.forEach((tt) => {
      // console.log(tt);

      let md = fs.readFileSync(tt.path, 'utf8');
      let fm = front.parse(md);
      tt = { ...tt, ...fm };
      // console.log(tt.title);

      tt.created = moment(tt.created);

      const regexDesc = /___\n(?<desc>.*?)\n___/gs
      const resultDesc = regexDesc.exec(tt._content);
      tt.text = resultDesc?.groups?.desc;

      let cardlink = getCardLinkDataFromMarkdown(tt._content, _config.favicon_service_url);
      // console.log(cardlink[0].title);
      if(cardlink[0]?.title) {
        cardlink[0].titleOriginal = cardlink[0].title;
        delete cardlink[0].title;
      }
      tt = {...tt, ...cardlink[0]};
      // console.log(tt.title);

      let images = getImagesFromMarkdown(tt._content);
      tt.imagePath = images[0].url;
      //console.log(">>> " + tt.imagePath);

      const sourceImagePath = path.join(_ttDir, tt.imagePath);
      const targetImagePath = path.join(_rootPath, _config.static_dir, "images", "tiny-tools", path.basename(tt.imagePath));

      if (!fs.existsSync(targetImagePath)) {
        fs.copyFileSync(sourceImagePath, targetImagePath);
        //console.log(sourceImagePath + " > " + targetImagePath);
      };
      tt.imageUrl = _config.root + "images/tiny-tools/" + path.basename(tt.imagePath);

      //console.log(tt);
      result.push(tt);
    });

    // console.log(result);
    return result;
  }

}
module.exports.TinyToolsGenerator = TinyToolsGenerator;
