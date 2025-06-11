'use strict';

const { magenta } = require('chalk');

const fs = require("fs");
const path = require("path");
const url = require("url");
const frontmatter = require("front-matter");
const handlebars = require("handlebars");
const puppeteer = require("puppeteer/cjs-entry");
// const imagemin = require("imagemin");
// const imageminPngquant = require("imagemin-pngquant");
const sharp = require('sharp');

const _currentPath = __dirname;
const _tempFolder = "./~temp";

var _photoFolder;
var _templateFile;
var _template;
var _targetFolder;

class SocialMediaImageGenerator {

  constructor(photoFolder, templateFile, targetFolder) { 
      
    _photoFolder = path.join(_currentPath, photoFolder);
    _templateFile = path.join(_currentPath, templateFile);
    _targetFolder = path.join(_currentPath, targetFolder);

    if (!fs.existsSync(_photoFolder)) {
      throw "Photo folder not found";
    }
    if (!fs.existsSync(_templateFile)) {
      throw "Template file not found";
    }
    if (!fs.existsSync(_targetFolder)) {
      throw "Target folder not found";
    }

    if (!fs.existsSync(_tempFolder)) {
      fs.mkdirSync(_tempFolder);
    }

    let source = fs.readFileSync(_templateFile).toString('utf8');
    _template = handlebars.compile(source);
  }

  generateByPhoto(photoFile, fileSlug, title, subtitle, category) {
    let self = this;

    self.process(
      fileSlug,
      {
        title: title, 
        subtitle: subtitle, 
        categories: [category],
        photo: url.pathToFileURL(path.join(_photoFolder, photoFile))
      })
      .then(() => {
        fs.rmSync(_tempFolder, { recursive: true });
      });
  }

  /**
   * Runs the generation of missing social media image of posts
   */
  generateForPosts(postFolder) {
    let self = this;

    const postPath = path.join(_currentPath, postFolder);

    const postFiles = this.getPostFiles(postPath);

    var postsProcessed = 0;
    postFiles.forEach((file) => {
      fs.readFile(file, 'utf8', function(err, data) {
        if (err) throw err;

        let content = frontmatter(data);
        // console.log(content.attributes)

        let fileName = path.basename(file, path.extname(file));
        //console.log(fileName + " | " + content.attributes.hidden);

        // only process not hidden posts with defined photograph file and if social media file is missing
        if ((content.attributes.hidden === undefined || content.attributes.hidden === false) && 
            content.attributes.photograph?.file && 
            !fs.existsSync(path.join(_targetFolder, fileName + ".jpg"))) {

          self.process(
            fileName,
            {
              title: content.attributes.title, 
              subtitle: content.attributes.subtitle, 
              categories: content.attributes.categories,
              photo: url.pathToFileURL(path.join(_photoFolder, content.attributes.photograph.file))
            })
            .then(() => {
              //console.log(postsProcessed + '=' + postFiles.length);
              if (postsProcessed === postFiles.length) {
                fs.rmSync(_tempFolder, { recursive: true });
              }
            });
        }
        postsProcessed += 1;
      });
    });
    
  }

  /**
   * Get all post MD files recursively
   * @param {String} dirPath  Starting folder to look for MD files 
   * @param {Array} allFiles  Array for storing files found
   * @returns 
   */
  getPostFiles(dirPath, allFiles) {
    let files = fs.readdirSync(dirPath);

    allFiles = allFiles || [];

    files.forEach((file) => {
      if (fs.statSync(dirPath + "/" + file).isDirectory()) {
        allFiles = this.getPostFiles(dirPath + "/" + file, allFiles)
        //console.log("DIR: " + file);
      } else if (file.indexOf(".md")>=0) {
        allFiles.push(path.join(dirPath, "/", file))
      }
    });
    return allFiles;
  }

  /**
   * Process Social Media Image by creating a temporary HTML file, which will be converted to an image.
   * @param {String} fileName Name of the image file without extension.
   * @param {Object} vars     Template variables.
   */
  async process(fileName, vars) {
    //console.log(fileName + " >> " + vars.title + " - " + vars.subtitle + " : " + vars.photo);

    console.log("Generating Social Media Image " + magenta(fileName));

    let html = _template(vars);
    //console.log(html);

    let tempFile = path.join(_tempFolder, fileName + ".html");

    fs.writeFile(tempFile, html, (err) => {
      if(err) { throw(err); }
      //console.log(tempFile + " saved");
    });

    await this.createImage(fileName, tempFile);
    await this.createThumb(fileName);

    return;
  }

  /**
   * Generates an optimized JPG image out of the temporary HTML file.
   * @param {String} fileName Name of the image file without extension.
   * @param {String} tempFile Path to the temporary HTML file.
   */
  async createImage(fileName, tempFile) {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url.pathToFileURL(tempFile));

    await page.setViewport({
      width: 1200,
      height: 630,
      deviceScaleFactor: 1
    });

    let imgTemp = path.join(_tempFolder, fileName + ".jpg"); 
    let imgFile = path.join(_targetFolder, fileName + ".jpg");

    await page.screenshot({
      path: imgTemp
    });

    await browser.close();

    await sharp(imgTemp)
      .jpeg({ quality: 85, mozjpeg: true })
      .toFile(imgFile);

    // OLD: png
    // await imagemin([imgFile], 'build', {
    //   plugins: [
    //     imageminPngquant({ quality: '75-90' })
    //   ]
    // });

    console.log("\x1b[32m", "SOCIAL-MEDIA-IMAGE-GENERATOR: ", "\x1b[0m" + imgFile + " generated");
  
    return;
  }

  /**
   * Creates a thumbnail file out of a social media file
   * @param {String} fileName Name of the image file without extension.
   */
  async createThumb(fileName) {

    //let imgOriginal = path.join(_targetFolder, fileName + ".jpg");
    let imgTemp = path.join(_tempFolder, fileName + ".jpg"); 
    let imgThumb = path.join(_targetFolder, fileName + ".thumb.jpg");

    await sharp(imgTemp)
      .resize(400, 210)
      //.png({quality: 90})
      .jpeg({ quality: 85, mozjpeg: true })
      .toFile(imgThumb);
  
    console.log("\x1b[32m", "SOCIAL-MEDIA-IMAGE-GENERATOR: ", "\x1b[0m" + imgThumb + " generated");

    return;
  }

}
module.exports.SocialMediaImageGenerator = SocialMediaImageGenerator;