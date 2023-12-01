/**
 * node "./lib/_once_move_temp_photos.js"
 */


const fs = require("fs");
const path = require("path");

const tempFolder = "../~temp";
const photoFolder = "../static/photos";

const _currentPath = __dirname;

let _tempFolder = path.join(_currentPath, tempFolder);
let _photoFolder = path.join(_currentPath, photoFolder);

const folders = fs.readdirSync(_tempFolder);

folders.forEach((folder) => {
  console.log(folder);

  const mobileFileFrom = path.join(_tempFolder, folder, "mobile.jpg");
  const mobileFileTo = path.join(_photoFolder, "mobile", folder + ".jpg");
  fs.rename(mobileFileFrom, mobileFileTo, function (err) {
    if (err) throw err; console.log(folder + ' successfully renamed (moved)!');
  });

  const tabletFileFrom = path.join(_tempFolder, folder, "tablet.jpg");
  const tabletFileTo = path.join(_photoFolder, "tablet", folder + ".jpg");
  fs.rename(tabletFileFrom, tabletFileTo, function (err) {
    if (err) throw err; console.log(folder + ' successfully renamed (moved)!');
  });

  const normalFileFrom = path.join(_tempFolder, folder, "normal.jpg");
  const normalFileTo = path.join(_photoFolder, "normal", folder + ".jpg");
  fs.rename(normalFileFrom, normalFileTo, function (err) {
    if (err) throw err; console.log(folder + ' successfully renamed (moved)!');
  });

});
