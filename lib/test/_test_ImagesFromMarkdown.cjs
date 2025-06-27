/**
 * This is only for executing the test manually. 
 * 
 * Execution:
 * node "./lib/test/_test_ImagesFromMarkdown.cjs"
 */

const fs = require("fs");
const path = require("path");

const { getImagesFromMarkdown } = require("../tools.cjs");

const _currentPath = __dirname;
const _rootPath = path.join(_currentPath, "../../");

const testFile = path.join(_rootPath, "/data/21.14 Tiny Tools/12ft Ladder.md");
console.log(testFile);

let md = fs.readFileSync(testFile, 'utf8');

let images = getImagesFromMarkdown(md);

console.log(images);