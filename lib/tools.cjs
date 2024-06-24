const path = require("path");
const fs = require('fs');
const hfs = require('hexo-fs');
const handlebars = require("handlebars");
const front = require('hexo-front-matter');

module.exports = { 
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
  getHelpers: (hexo) => {
    return Object.keys(hexo.extend.helper.store).reduce((result, name) => {
      result[name] = hexo.extend.helper.get(name).bind({ ...hexo, page: {} });
      return result;
    }, {});
  },
  getDataFromCardlinkCodeBlock: (code, favIconServiceUrl) => {

    code = code.replace("```cardlink\n", "").replace("\n```", "");

    let lines = { x: null };

    code.split(/\r?\n/).forEach((line) => {
      let item = line.split(/:(.*)/s);
      let key = item[0];
      let value = item[1].replace(/["]/g, "").trim();
      lines[key] = value;
    });

    if (favIconServiceUrl) {
      lines.favicon = favIconServiceUrl.replace("{URL}", lines.url);
    }

    delete lines.x;

    return lines;
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
  }
}