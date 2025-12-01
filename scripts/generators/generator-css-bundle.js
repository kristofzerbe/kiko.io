// Derived from https://github.com/MoNwastaken/hexo-css-merge

const log = require('hexo-log')({ debug: false, silent: false });
const fs = require('hexo-fs');
const path = require('path');
const cleanCSS = require('clean-css');

hexo.extend.generator.register('css-bundle', function () {
  const config = this.config;
  const bundle = config.css_bundle;

  let result = [];

  log.info(`Bundling CSS info ${bundle.target}.css ...`);
  
  let files = bundle.files_in_order.map(file => {
    return path.join("themes", config.theme, config.source_dir, "css", `${file}.css`);
  });

  let styles = "";
  files.forEach(file => {
    styles += fs.readFileSync(file);
  });

  result.push({
    path: `/css/${bundle.target}.css`,
    data: styles
  });

  log.info(`Minifying ${bundle.target}.css ...`);

  let clean = new cleanCSS().minify(styles);

  log.info(`... from ${clean.stats.originalSize} to ${clean.stats.minifiedSize} KB`);

  result.push({
    path: `/css/${bundle.target}.min.css`,
    data: clean.styles
  });

  return result;
});