const log = require("hexo-log")({ debug: false, silent: false });
const { magenta } = require("chalk");
const path = require("path");
const fs = require("hexo-fs");
const front = require("hexo-front-matter");
const sharp = require("sharp");
// const { highlight } = require("hexo-util");
// const { config } = require("process");

hexo.extend.generator.register("notes", function (locals) {
  log.info("Generating Pages for " + magenta("NOTES") + " ...");

  let config = this.config;
  let notesDir = path.join(config.source_dir, "_" + config.notes_dir);
  let currentYear = new Date().getFullYear();

  // collection of pages to render
  let result = [];

  let years = fs
    .readdirSync(notesDir)
    .filter((entry) => fs.statSync(path.join(notesDir, entry)).isDirectory())
    .map((entry) => ({
      year: entry,
      path: path.join("notes", entry, "index.html"),
      link: path.join("notes", entry).replace(/\\/g, "/")
    }));

  if (years.filter(y => y.year === currentYear.toString()).length === 0) {
    log.error("Notes folder for current year doesn't exist!");
    throw new Error("... see console and create folder for " + currentYear);
  }

  let indexes = [];
  years.forEach((year) => {

    let yearDir = path.join(notesDir, year.year);

    // get index
    let index = year;
    index.name = "notes" + index.year;
    index = {
      ...index,
      ...getMDInfo(path.join(yearDir, "index.md"), index, false),
    };
    index.notes = [];

    // (processed in 'on-ready-get-notes')
    locals.notes.filter((note) => note.year === year.year).forEach((note) => {
      result.push({
        data: note,
        path: note.path,
        layout: "note",
      });

      //... and to index notes list
      index.notes.push(note);  
    });

    index.notes.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    if (index.notes.length > 0 || index.year === currentYear.toString()) {
      indexes.push(index);
      log.info("-> " + magenta(index.notes.length) + " Notes for " + magenta(index.year));

      processAttachments(yearDir, index.year);
    }
  });

  let yearsAvailable = indexes.map((index) => index.year);

  let yearList = years
    .filter((item) => yearsAvailable.includes(item.year))
    .sort((a, b) => b.year - a.year);

  indexes.forEach((index) => {
    index.years = yearList;

    // add year index to result
    result.push({
      data: index,
      path: path.join(index.path),
      layout: "notes"
    });

    // add root index for current year
    if (index.year == currentYear) {
      result.push({
        data: index,
        path: path.join("notes", "index.html"),
        layout: "notes"
      });
    }
  });

  return result;
});

function getMDInfo(filePath, obj, parseContent) {
  let md = fs.readFileSync(filePath);
  let fm = front.parse(md);
  obj = { ...obj, ...fm };

  if (parseContent) {
    let content = obj._content.split("\n<!-- more -->\n");

    if (content.length === 2) {
      obj.content = hexo.render.renderSync({
        text: content.join("\n"),
        engine: "markdown",
      });
      obj.excerpt = hexo.render.renderSync({
        text: content[0],
        engine: "markdown",
      });
      obj.more = true;
    } else {
      obj.content = hexo.render.renderSync({
        text: obj._content,
        engine: "markdown",
      });
      obj.excerpt = obj.content;
      obj.more = false;
    }
  }
  return obj;
}

function processAttachments(sourceDir, year) {
  let attachmentDir = path.join(sourceDir, "_attachments");

  if (!fs.existsSync(attachmentDir)) {
    return;
  }

  // set relative paths
  let sourcePathRel = path.join("_" + "notes", year, "_attachments");
  let targetPathRel = path.join("notes", year, "_attachments");

  // set absolute paths
  let sourcePath = path.join(hexo.source_dir, sourcePathRel);
  let targetPath = path.join(hexo.public_dir, targetPathRel);

  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true });
  }

  let files = fs
    .readdirSync(attachmentDir)
    .filter((entry) => fs.statSync(path.join(attachmentDir, entry)).isFile());

  let imageRegEx = /.*.(jpg|jpeg|png)/g

  // ----------------------------------------------------------------------------------

  let others = files
    .filter((file) => !file.match(imageRegEx))
    .map((entry) => ({ file: entry }));

  if (others.length > 0) {
    others.forEach((other) => {
      other.sourcePathRel = path.join(sourcePathRel, other.file);
      other.source = path.join(sourcePath, other.file);
      other.target = path.join(targetPath, other.file);

      fs.copyFile(other.source, other.target);  
      log.info("Processed: '" + magenta(other.sourcePathRel));
    });
  }

  // ----------------------------------------------------------------------------------

  // get images of notes
  let images = files
    .filter((file) => file.match(imageRegEx))
    .map((entry) => ({ file: entry }));

  if (images.length > 0) {

    // extend image path info
    images.forEach((image) => {
      image.sourcePathRel = path.join(sourcePathRel, image.file);
      image.source = path.join(sourcePath, image.file);
      image.target = path.join(targetPath, image.file);

      if (!fs.existsSync(image.target)) {

        sharp(image.source).metadata(function(err, metadata) {
          //console.log(metadata.format + " - " + metadata.width);

          if (metadata.width > 600) {

            switch (metadata.format) {
              case 'png':
                sharp(image.source)
                  .resize({ width: 600, kernel: sharp.kernel.cubic })
                  .png({ compressionLevel: 9, force: true })
                  .toFile(image.target)
                  .then(function (newFileInfo) {
                    log.info("Processed: '" + magenta(image.sourcePathRel));
                  })
                  .catch(function (err) {
                    log.warn("Error on processing note image '" + image.sourcePathRel + "': " + err);
                  });
                break;
            
              case 'jpg', 'jpeg':
                sharp(image.source)
                  .resize({ width: 600 })
                  .jpeg({ mozjpeg: true })
                  .toFile(image.target)
                  .then(function (newFileInfo) {
                    log.info("Processed: '" + magenta(image.sourcePathRel));
                  })
                  .catch(function (err) {
                    log.warn("Error on processing note image '" + image.sourcePathRel + "': " + err);
                  });
                break;

              default:
                break;
            }

          } else {

            switch (metadata.format) {
              case 'png':
                sharp(image.source)
                  .png({ compressionLevel: 9, force: true })
                  .toFile(image.target)
                  .then(function (newFileInfo) {
                    log.info("Processed: '" + magenta(image.sourcePathRel));
                  })
                  .catch(function (err) {
                    log.warn("Error on processing note image '" + image.sourcePathRel + "': " + err);
                  });
                break;
            
              case 'jpg':
                sharp(image.source)
                  .jpeg({ mozjpeg: true })
                  .toFile(image.target)
                  .then(function (newFileInfo) {
                    log.info("Processed: '" + magenta(image.sourcePathRel));
                  })
                  .catch(function (err) {
                    log.warn("Error on processing note image '" + image.sourcePathRel + "': " + err);
                  });
                break;

              default:
                break;
            }

          }

        })

      }
    });
  }
}
