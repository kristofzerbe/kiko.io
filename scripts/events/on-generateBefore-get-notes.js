const log = require("hexo-log")({ debug: false, silent: false });
const { magenta } = require("chalk");
const path = require("path");
const fs = require("hexo-fs");
const front = require("hexo-front-matter");
const moment = require("moment");
const { getDataFromCardlinkCodeBlock, compileHandlebar } = require("../../lib/tools.cjs");

hexo.on('generateBefore', function() {
  log.info("Getting " + magenta("NOTES") + " ...");

  const config = this.config;

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
        indexlink: "/" + index.link
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
      note.permalink = "/" + note.link;
      note.categories = [{ name: "Note", path: "notes" }];

      if (!note.hidden) {
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

    // HACK: Bend image and other attachment sources in Markdown to correct subfolder
    obj._content = obj._content.replaceAll('](_attachments/', '](/notes/' + obj.year + '/_attachments/');
    obj._content = obj._content.replaceAll('src="_attachments/', 'src="/notes/' + obj.year + '/_attachments/');
    
    let content = obj._content.split("\n<!-- more -->\n");

    if (content.length === 2) {
      obj.more = true;
      obj.content = hexo.render.renderSync({
        text: convertObsidianCardlink(content.join("\n")),
        engine: "markdown",
      });
      obj.excerpt = hexo.render.renderSync({
        text: removeObsidianCardlink(content[0]),
        engine: "markdown",
      });
      
    } else {
      obj.more = false;
      obj.content = hexo.render.renderSync({
        text: convertObsidianCardlink(obj._content),
        engine: "markdown",
      });
      obj.excerpt = hexo.render.renderSync({
        text: removeObsidianCardlink(obj._content),
        engine: "markdown",
      });
    }
  }
  return obj;
}

function convertObsidianCardlink(content) {
    const regexp = /```cardlink\n(.*?)\n```/gs
    const matches = content.matchAll(regexp);
    for (const match of matches) {
      const lines = getDataFromCardlinkCodeBlock(match[0], hexo.config.favicon_service_url);
      const element = compileHandlebar(hexo, "cardlink-with-separator.handlebars", lines);
      content = content.replace(match[0], element);
    }
    return content;
}

function removeObsidianCardlink(content) {
  const regexp = /```cardlink\n(.*?)\n```/gs
  const matches = content.matchAll(regexp);
  for (const match of matches) {
    content = content.replace(match[0], "");
  }
  return content;
}