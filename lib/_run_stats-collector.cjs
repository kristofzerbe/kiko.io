/**
 * This is only for executing the collector manually. 
 * 
 * Execution:
 * node "./lib/_run_stats-collector.cjs"
 */

const Hexo = require("hexo");
let hexo = new Hexo(process.cwd(), {});

const StatsCollector = require("./stats-collector.cjs").StatsCollector;

hexo.init().then(function () {
  const generator = new StatsCollector(hexo);
  generator.getPostStats();
});
