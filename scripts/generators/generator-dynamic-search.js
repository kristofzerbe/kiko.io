const log = require('hexo-log')({ debug: false, silent: false });
const { magenta } = require('chalk');
const path = require('path');
const fs = require("hexo-fs");
const handlebars = require("handlebars");

const _rootDir = hexo.source_dir.replace("source", "");

hexo.extend.generator.register("dynamic-search", async function(locals) {
  log.info("Generating Dynamic Page " + magenta("SEARCH") + " ...");

  const config = this.config;

  let result = [];

  // Page
  let page = locals.dynamic.search;
  page.urlparam = config.search.url_parameter;

  result.push({
    data: page,
    path: path.join(page.permalink, "index.html"),
    layout: "search"
  });

  // opensearch.xml
  const osTemplate = path.join(_rootDir, config.template_dir, config.search.opensearch_template);
  if (!fs.existsSync(osTemplate)) { throw "OpenSearch Template file not found"; }

  const osSource = fs.readFileSync(osTemplate).toString('utf8');
  const os = handlebars.compile(osSource);
  const osResult = os({
    shortname: config.title,
    faviconUrl: config.url + "/" + config.favicon,
    searchUrl: config.url + "/" + config.search.path,
    searchParameter: config.search.url_parameter
  });

  result.push({
    path: config.search.opensearch_path,
    data: osResult
  });


  return result;
});
