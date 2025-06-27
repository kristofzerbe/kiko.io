/**
 * This is only for executing the test manually. 
 * 
 * Execution:
 * node "./lib/test/_test_CardLinkDataFromMarkdown.cjs"
 */

const fs = require("fs");
const path = require("path");
const yaml = require('js-yaml');

const { getCardLinkDataFromMarkdown } = require("../tools.cjs");

const _currentPath = __dirname;
const _rootPath = path.join(_currentPath, "../../");
const _config = yaml.load(fs.readFileSync('./_config.yml', 'utf8'));
//console.log(_config.favicon_service_url);

const testFile = path.join(_rootPath, "/data/21.14 Tiny Tools/12ft Ladder.md");
console.log(testFile);

let md = fs.readFileSync(testFile, 'utf8');

let data = getCardLinkDataFromMarkdown(md, _config.favicon_service_url);

console.log(data);