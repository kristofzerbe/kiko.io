const path = require("path");
const fs = require('fs');
const hfs = require('hexo-fs');
const handlebars = require("handlebars");
const front = require('hexo-front-matter');

function getCardLinkData(data, favIconServiceUrl) {
  let lines = { x: null };

  data.split(/\r?\n/).forEach((line) => {
    let item = line.split(/:(.*)/s);
    //console.log(item);
    let key = item[0];
    let value = item[1].replace(/["]/g, "").trim();
    lines[key] = value;
  });

  if (favIconServiceUrl) {
    lines.favicon = favIconServiceUrl.replace("{URL}", lines.url);
  }

  delete lines.x;

  return lines;
}

module.exports = {  
  ensurePermaLink: (hexo, permalink) => {
    if (permalink && permalink.startsWith(hexo.config.url) == false) {
      permalink = hexo.config.url + permalink;
    }
    return permalink;
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
  getMD: (hexo, source, page) => {
    const sourceFile = path.join(hexo.source_dir, source);

    // Get MD data
    const md = hfs.readFileSync(sourceFile);
    let fm = front.parse(md);
    page = {...page, ...fm};

    if (page.permalink && page.permalink.startsWith(hexo.config.url) == false) {
      page.permalink = hexo.config.url + page.permalink;
    }

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
  getHelpers: (hexo) => {
    return Object.keys(hexo.extend.helper.store).reduce((result, name) => {
      result[name] = hexo.extend.helper.get(name).bind({ ...hexo, page: {} });
      return result;
    }, {});
  },
  getDataFromCardlinkCodeBlock: (code, favIconServiceUrl) => {
    code = code.replace("```cardlink\n", "").replace("\n```", "");
    return getCardLinkData(code, favIconServiceUrl);
  },
  getDataFromCardlinkDummyBlock: (code, favIconServiceUrl) => {
    code = code.replace("@@@cardlink\n", "").replace("\n@@@", "");
    return getCardLinkData(code, favIconServiceUrl);
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
  }
}
