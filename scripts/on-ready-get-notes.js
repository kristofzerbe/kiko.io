const log = require("hexo-log")({ debug: false, silent: false });
const { magenta } = require("chalk");
const path = require("path");
const fs = require("hexo-fs");
const front = require("hexo-front-matter");
const moment = require("moment");

hexo.on('ready', function() {
  let config = this.config;

  log.info("Getting Notes");

  let noteItems = [];

  let notesDir = path.join(config.source_dir, "_" + config.notes_dir);

  let years = fs
    .readdirSync(notesDir)
    .filter((entry) => fs.statSync(path.join(notesDir, entry)).isDirectory())
    .map((entry) => ({
      year: entry,
      link: path.join("notes", entry).replace(/\\/g, "/")
    })
  );

  years.forEach((year) => {

    let yearDir = path.join(notesDir, year.year);

    // get index for Frontmatter
    let index = year;
    index.name = "notes" + index.year;
    index = {
      ...index,
      ...getMDInfo(path.join(yearDir, "index.md"), index, false),
    };
    
    let notes = fs
      .readdirSync(yearDir)
      .filter((entry) => fs.statSync(path.join(yearDir, entry)).isFile())
      .filter((file) => file.match(/\d{2}-\d{2}-.*.md/g))
      .map((entry) => ({
        file: entry,
        key: index.year + "/" + entry.replace(".md", ""),
        slug: index.year + "/" + entry.replace(".md", "").replace(/\d{2}-\d{2}-/g, ""), // same as post
        year: index.year,
        indexlink: "/" + index.link,
      })
    );

    notes.forEach((note) => {
      note = {
        ...note,
        ...getMDInfo(path.join(yearDir, note.file), note, true),
      };
      note.layout = "note";
      note.date = moment(note.date);
      note.published = true;
      note.photograph = index.photograph;
      note.path = path.join("notes", note.slug, "index.html");
      note.link = path.join("notes", note.slug).replace(/\\/g, "/") + "/";
      note.permalink = config.url + "/" + note.link;

      note.excerpt = note.excerpt.replaceAll(
        "/images/",
        "/notes/" + index.year + "/images/"
      ); /** HACK */
      note.content = note.content.replaceAll(
        "/images/",
        "/notes/" + index.year + "/images/"
      ); /** HACK */

      if (!note.hide) {
        noteItems.push(note);
      }

    });

    this.locals.set('notes', noteItems);
  });

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