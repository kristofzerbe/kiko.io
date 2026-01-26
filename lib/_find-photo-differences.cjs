'use strict';

/**
 * node "./lib/_find-photo-differences.cjs"
 */

const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const { magenta } = require('chalk');

const _currentPath = __dirname;
const _rootPath = path.join(_currentPath, "../");
const _config = yaml.load(fs.readFileSync('./_config.yml', 'utf8'));

const photoFolder = path.join(_rootPath, _config.static_dir, _config.photo_dir);
const metaFolder = path.join(photoFolder, "meta");
const mobileFolder = path.join(photoFolder, "mobile");
const normalFolder = path.join(photoFolder, "normal");

console.log("Finding differences in " + photoFolder);

let metaFiles = fs.readdirSync(metaFolder).map(f => {
  return path.parse(f).name;
});
let mobileFiles = fs.readdirSync(mobileFolder).map(f => {
  return path.parse(f).name;
});
let normalFiles = fs.readdirSync(normalFolder).map(f => {
  return path.parse(f).name;
});

// https://stackoverflow.com/questions/1187518/how-to-get-the-difference-between-two-arrays-in-javascript
// let intersection = metaFiles.filter(x => !normalFiles.includes(x)).concat(normalFiles.filter(x => !metaFiles.includes(x)));
// console.log(intersection);

console.log(magenta("META has no NORMAL:"));
console.log(metaFiles.filter(x => !normalFiles.includes(x)));

console.log(magenta("NORMAL has no META:"));
console.log(normalFiles.filter(x => !metaFiles.includes(x)));

console.log(magenta("NORMAL has no MOBILE:"));
console.log(normalFiles.filter(x => !mobileFiles.includes(x)));
