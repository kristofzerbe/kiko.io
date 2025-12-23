const path = require("path");
const fs = require('fs');
const hfs = require('hexo-fs');
const handlebars = require("handlebars");
const front = require('hexo-front-matter');
const util = require('util');

module.exports = {  
  getHelpers: (hexo) => {
    return Object.keys(hexo.extend.helper.store).reduce((result, name) => {
      result[name] = hexo.extend.helper.get(name).bind({ ...hexo, page: {} });
      return result;
    }, {});
  },
  log: (obj) => {

    // Alternative 1: use string without colors
    // console.log(JSON.stringify(obj, null, 2));

    // Alternative 2: change Node.js settings
    // require('util').inspect.defaultOptions.depth = null;
    // console.log(obj);

    // Alternative 3: use console with different Node.js settings
    console.log(util.inspect(obj, { showHidden: false, depth: null, colors: true }));
  },
  getNewestDateString: (entry) => {
    let result = "";

    const date = new Date(entry.date);

    let updated;
    if (updated) updated = new Date(entry.updated);

    if (!isNaN(updated) && !isNaN(date) && updated > date) {
      result = updated.toISOString();
    } else if (!isNaN(updated)) {
      result = updated.toISOString();
    } else if (!isNaN(date)) {
      result = date.toISOString();
    }
  
    return result;
  }, 
  getDeltaFromToday: (date) => {
    if (!date) return -1;
    const date1 = new Date(date).getTime();
    const date2 = Date.now();
    const oneDay = 1000 * 60 * 60 * 24; // One day in milliseconds
    const diffInTime = date2 - date1; // Calculating the time difference between two dates
    return Math.round(diffInTime / oneDay); // Calculating the no. of days between two dates
  },
  getMD: (hexo, source, page) => {
    const sourceFile = path.join(hexo.source_dir, source);

    // Get MD data
    const md = hfs.readFileSync(sourceFile);
    let fm = front.parse(md);
    page = {...page, ...fm};

    // Convert Markdown content into HTML
    page.content = hexo.render.renderSync({ text: page._content, engine: 'markdown' });

    return page;
  },
  updateMDField: (hexo, source, fmField, fmValue) => {
    const sourceFile = path.join(hexo.source_dir, source);
    
    // Get MD data
    const md = hfs.readFileSync(sourceFile);
    let fm = front.parse(md);

    // Store value in field
    fm[fmField] = fmValue;
    let fmString = front.stringify(fm, { prefixSeparator: true });

    // Safe MD
    hfs.writeFileSync(sourceFile, fmString);

    return fmValue;
  },
  getImagesFromMarkdown: (markdown) => {
    
    //get images from content by Markdown Syntax = ![CAPTION](URL)
    const regexMD = /(?:[!]\[(?<caption>.*?)\])\((?<image>.*?)\)/g;
    let matchesMD = markdown.matchAll(regexMD);
    let imagesMD = [...matchesMD].map(img => {
      return {
        url: img.groups.image,
        caption: img.groups.caption
      }
    });

    //get images from content by Wiki-Style Syntax = ![[URL]]
    const regexWS = /(?:[!]\[\[(?<image>.*?)\]\])/g;
    let matchesWS = markdown.matchAll(regexWS);
    let imagesWS = [...matchesWS].map(img => {
      return {
        url: img.groups.image,
        caption: ""
      }
    });

    return [...imagesMD, ...imagesWS];
  },
  getCardLinkDataFromMarkdown(markdown, favIconServiceUrl) {
    let data = [];
    const regex = /(?:[`]{3}cardlink\n(?<data>.*?)\n[`]{3})/gs;
    const matches = markdown.matchAll(regex);
    data = [...matches].map(m => {
      //console.log(m);
      return module.exports.getCardLinkData(m.groups.data, favIconServiceUrl);
    });
    return data;
  },
  getCardLinkData(data, favIconServiceUrl) {
      let fm = front.parse("---\n" + data + "\n---"); //seed for mocking FM
      delete fm._content;
      if (favIconServiceUrl) {
        fm.favicon = favIconServiceUrl.replace("{URL}", fm.url);
      }
      //console.log(fm);
      return fm;
  },
  getDataFromCardlinkCodeBlock: (code, favIconServiceUrl) => {
    //TODO: replace with getCardLinkDataFromMarkdown
    code = code.replace("```cardlink\n", "").replace("\n```", "");
    return module.exports.getCardLinkData(code, favIconServiceUrl);
  },
  getDataFromCardlinkDummyBlock: (code, favIconServiceUrl) => {
    code = code.replace("@@@cardlink\n", "").replace("\n@@@", "");
    return module.exports.getCardLinkData(code, favIconServiceUrl);
  },
  compileHandlebar: (hexo, templateFileName, dataObject) => {
    const rootDir = hexo.source_dir.replace("source", "");
    const templateFile = path.join(rootDir, hexo.config.template_dir, templateFileName);
    if (!fs.existsSync(templateFile)) { 
      throw "Template file '" + templateFileName + "' not found";
    }
  
    const source = fs.readFileSync(templateFile).toString('utf8');
    const template = handlebars.compile(source);
    const element = template(dataObject);
  
    return element;
  },
  getCustomUA: (config) => {
    return `Node.js/${process.versions.node} (${process.platform};${process.arch}) ${config.meta_generator.replace(" ", "\/")} ${config.title}`;
  },
  slugify: (str) => {
    str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
    str = str.toLowerCase(); // convert string to lowercase
    str = str.replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
             .replace(/\s+/g, '-') // replace spaces with hyphens
             .replace(/-+/g, '-'); // remove consecutive hyphens
    return str;
  },
  slugifyTitle: (str) => {
    str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
    str = str.replace(/[^a-zA-Z0-9 -]/g, '') // remove any non-alphanumeric characters
             .replace(/\s+/g, '-') // replace spaces with hyphens
             .replace(/-+/g, '-'); // remove consecutive hyphens
    return str;
  },
  humanizeNumber: (num) => {
    //https://gist.github.com/ForbesLindesay/5467742

    let ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    let tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    let numString = num.toString();

    if (num < 0) return undefined;
    if (num === 0) return 'zero';
    
    if (num < 20) { return ones[num];}

    if (numString.length === 2) { 
      return tens[numString[0]] + ' ' + ones[numString[1]]; 
    }

    if (numString.length == 3) {
      if (numString[1] === '0' && numString[2] === '0') {
        return ones[numString[0]] + ' hundred';
      } else {
        return ones[numString[0]] + ' hundred and ' + module.exports.humanizeNumber(+(numString[1] + numString[2]));
      }
    }

    if (numString.length === 4) {
      var end = +(numString[1] + numString[2] + numString[3]);
      if (end === 0) return ones[numString[0]] + ' thousand';
      if (end < 100) return ones[numString[0]] + ' thousand and ' + module.exports.humanizeNumber(end);
      return ones[numString[0]] + ' thousand ' + module.exports.humanizeNumber(end);
    }    
  },
  humanizeNumber_de: (num) => {
    //https://gist.github.com/ForbesLindesay/5467742

    let ones = ['', 'ein', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn', 'elf', 'zwölf', 'dreizehn', 'vierzehn', 'fünfzehn', 'sechzehn', 'siebzehn', 'achtzehn', 'neunzehn'];
    let tens = ['', '', 'zwanzig', 'dreißig', 'vierzig', 'fünfzig', 'sechzig', 'siebzig', 'achtzig', 'neunzig'];

    let numString = num.toString();

    if (num < 0) return undefined;
    if (num === 0) return 'zero';
    
    if (num < 20) { return ones[num];}

    if (numString.length === 2) { 
      return ones[numString[1]] + 'und' + tens[numString[0]]; 
    }

    if (numString.length == 3) {
      if (numString[1] === '0' && numString[2] === '0') {
        return ones[numString[0]] + 'hundert';
      } else {
        return ones[numString[0]] + 'hundertund' + module.exports.humanizeNumber_de(+(numString[1] + numString[2]));
      }
    }

    if (numString.length === 4) {
      var end = +(numString[1] + numString[2] + numString[3]);
      if (end === 0) return ones[numString[0]] + 'tausend';
      if (end < 100) return ones[numString[0]] + 'tausendund' + module.exports.humanizeNumber_de(end);
      return ones[numString[0]] + 'tausend' + module.exports.humanizeNumber_de(end);
    }    
  }
}
