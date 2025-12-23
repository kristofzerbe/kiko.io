const log = require('hexo-log')({ debug: false, silent: false });
const { magenta } = require('chalk');
const path = require('path');

hexo.extend.generator.register("dynamic-stats", async function(locals) {
  log.info("Generating Dynamic Page " + magenta("STATS") + " ...");

  let result = [];

  let page = locals.dynamic.stats;
  result.push({
    data: page,
    path: path.join(page.permalink, "index.html"),
    layout: "stats"
  });

  let music = locals.dynamic.stats_music;
  result.push({
    data: music,
    path: path.join(music.permalink, "index.html"),
    layout: "stats-music"
  });

  let links = locals.dynamic.stats_links;
  result.push({
    data: links,
    path: path.join(links.permalink, "index.html"),
    layout: "stats-links"
  });

  return result;
});
