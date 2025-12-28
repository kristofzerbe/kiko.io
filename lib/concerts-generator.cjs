const fs = require("fs");
const path = require("path");
const yaml = require('js-yaml');
const front = require("hexo-front-matter");
const { slugify } = require("./tools.cjs");

const _currentPath = __dirname;
const _rootPath = path.join(_currentPath, "../");

let _config;
let _dataFolder;
let _dataFile;
let _imgFolder;
let _images;

class ConcertsGenerator {

  constructor() {
    _config = yaml.load(fs.readFileSync('./_config.yml', 'utf8'));
    _dataFolder = path.join(_rootPath, _config.data_dir, _config.concerts.data_folder);
    _dataFile = path.join(_dataFolder, _config.concerts.data_folder + ".md");

    _imgFolder = path.join(_dataFolder, "_attachments");
    _images = fs.readdirSync(_imgFolder);
  }

  generate() { 
    let result = [];

    let md = fs.readFileSync(_dataFile, 'utf8');
    const regex = /(?:[`]{3}concert\n(?<data>.*?)\n[`]{3})/gs;
    const matches = md.matchAll(regex);

    _images.forEach((img) => {
      // console.log(">>> " + img);
      const sourceImagePath = path.join(_imgFolder, img);
      const targetImagePath = path.join(_rootPath, _config.static_dir, "images", "artists", img);

      if (!fs.existsSync(targetImagePath)) {
        fs.copyFileSync(sourceImagePath, targetImagePath);
        // console.log(sourceImagePath + " > " + targetImagePath);
      };
    });

    result = [...matches].map(m => {
      let fm = front.parse("---\n" + m.groups.data + "\n---");
      delete fm._content;
      fm.artist = {
        name: fm.artist,
        slug: slugify(fm.artist)
      };
      // console.log(fm);
      return fm;
    });

    result = result.sort((a,b) => a.date - b.date).reverse();

    return result;
  }
  
}
module.exports.ConcertsGenerator = ConcertsGenerator;