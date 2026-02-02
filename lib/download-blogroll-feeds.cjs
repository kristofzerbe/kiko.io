'use strict';

/**
 * node "./lib/download-blogroll-feeds.cjs"
 */

const fs = require("fs");
const path = require("path");
const yaml = require('js-yaml');
const { open, writeFile } = require('node:fs/promises');
const { Readable } = require('stream');
const { red, yellow, green } = require('chalk');

const _currentPath = __dirname;
const _rootPath = path.join(_currentPath, "../");
const _config = yaml.load(fs.readFileSync('./_config.yml', 'utf8'));

const mdBlogroll = path.join(_rootPath, _config.data_dir, _config.blogroll.data_path, _config.blogroll.data_file);
const feedDir = path.join(_rootPath, _config.data_dir, _config.blogroll.data_path, _config.blogroll.data_feed_path);
const logDir = path.join(_rootPath, _config.data_dir, _config.blogroll.data_path, _config.blogroll.data_log_path);

//console.log(mdBlogroll);

let feedList = [];

(async () => {
  const file = await open(mdBlogroll);

  let refHost = null;
  for await (const line of file.readLines()) {
    //console.log(line);
    if (line.startsWith("host")) {
      refHost = line.replace("host:", "").trimStart();
    }
    if (line.startsWith("feed")) {
      feedList.push({
        host: refHost,
        url: line.replace("feed:", "").trimStart(),
        file: refHost.replaceAll(".", "-") + ".xml"
      });
      refHost = null;
    }
  }
  //console.log(feedList);

  feedList.forEach(async feed => {
    const feedPath = path.join(feedDir, feed.file);
    // console.log(feedPath);

    //https://stackoverflow.com/questions/37614649/how-can-i-download-and-save-a-file-using-the-fetch-api-node-js
    const logFile = feed.host.replaceAll(".", "-") + ".log.json";
    const logPath = path.join(logDir, logFile);

    try {
      const response = await fetch(feed.url);
      if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
      await writeFile(feedPath, Readable.fromWeb(response.body));

      console.log(green(`Feed from host ${feed.host} downloaded`));
      
      if (fs.existsSync(logPath)) { 
        fs.unlinkSync(logPath); 
        console.log(yellow(`Log file ${logFile} removed`));
      };

    } catch (error) {
      console.error(red(`Error reading feed from host ${feed.host}: ${error.message}`));
      
      fs.writeFileSync(logPath, JSON.stringify({
        feed: feed,
        date: new Date().toISOString(),
        error: error.message
      }));
    }
  });

})();

