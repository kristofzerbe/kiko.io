const log = require('hexo-log')({ debug: false, silent: false });
const { magenta } = require('chalk');
const path = require('path');
const { getMD, logobj } = require("../../lib/tools.cjs");

const MusicCollector = require("../../lib/music-collector.cjs").MusicCollector;

hexo.extend.generator.register("dynamic-music", async function(locals) {
  log.info("Generating Dynamic Page " + magenta("MUSIC") + " ...");

  let result = [];
  const collector = new MusicCollector(hexo, locals);

  let music = { name: "music" };
  music = getMD(hexo, path.join("_dynamic", music.name + ".md"), music);
  music.data = collector.getBandcampPosts();

  music.content = music.content
    .replace("{% bandcamp.count %}", music.data.bandcamp.count);

  result.push({
    data: music,
    path: path.join(music.permalink, "index.html"),
    layout: "music"
  });

  return result;
});