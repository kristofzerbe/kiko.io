const log = require('hexo-log')({ debug: false, silent: false });
const { magenta } = require('chalk');
const path = require('path');
const { getMD, logobj } = require("../../lib/tools.cjs");

const StatsCollector = require("../../lib/stats-collector.cjs").StatsCollector;

hexo.extend.generator.register("dynamic-stats", async function(locals) {
  log.info("Generating Dynamic Page " + magenta("STATS") + " ...");

  let result = [];
  const collector = new StatsCollector(hexo, locals);

  /** ----------------------------------------------------------------- */

  let page = { name: "stats" };
  page = getMD(hexo, path.join("_dynamic", page.name + ".md"), page);
  page.postData = collector.getPostStats();

  result.push({
    data: page,
    path: path.join(page.permalink, "index.html"),
    layout: "stats"
  });

  /** ----------------------------------------------------------------- */

  let music = { name: "stats-music" };
  music = getMD(hexo, path.join("_dynamic", music.name + ".md"), music);
  // TODO ... StatsCollector.getMusicStats();
  result.push({
    data: music,
    path: path.join(music.permalink, "index.html"),
    layout: "stats-music"
  });

  /** ----------------------------------------------------------------- */

  let links = { name: "stats-links" };
  links = getMD(hexo, path.join("_dynamic", links.name + ".md"), links);
  // TODO ... StatsCollector.getLinkStats();
  result.push({
    data: links,
    path: path.join(links.permalink, "index.html"),
    layout: "stats-links"
  });

  return result;
});
