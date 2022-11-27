const log = require('hexo-log')({ debug: false, silent: false });
const { magenta } = require('chalk');
const path = require('path');
const fs = require('hexo-fs');
const front = require('hexo-front-matter');
const sharp = require('sharp');
const imagemin = require('imagemin');
const imageminMozJpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const { highlight } = require('hexo-util');
const { config } = require('process');

hexo.extend.generator.register('notes', function(locals) {

    let config = this.config;
    let notesDir = path.join(config.source_dir, "_" + config.notes_dir);
    let currentYear = new Date().getFullYear();

    // collection of pages to render
    let result = [];

    log.info("Processing Notes...");

    let years = fs
        .readdirSync(notesDir)
        .filter(entry => fs.statSync(path.join(notesDir, entry)).isDirectory())
        .map(entry => ({
            year: entry,
            path: path.join("notes", entry, "index.html")
        }));

    let indexes = [];
    years.forEach(year => {
        //console.log(year);

        let yearDir = path.join(notesDir, year.year);

        // get index
        let index = year;
        index.name = "notes" + index.year;
        index = {...index, ...getMDInfo(path.join(yearDir, "index.md"), index. false)};
        index.notes = [];

        // get notes
        let notes = fs
            .readdirSync(yearDir)
            .filter(entry => fs.statSync(path.join(yearDir, entry)).isFile())
            .filter(file => file.match(/\d{2}-\d{2}-.*.md/g))
            .map(entry => ({
                file: entry,
                key: index.year + "-" + entry.replace(".md", "").replace(/\d{2}-\d{2}-/g, ""),
                slug: entry.replace(".md", "").replace(/\d{2}-\d{2}-/g, ""),
                year: index.year,
                indexlink: "/" + index.path.replace(/\\/g, "/")
            }));
        // console.log(notes);

        notes.forEach(note => {
            note = {...note, ...getMDInfo(path.join(yearDir, note.file), note, true) };
            note.photograph = index.photograph;
            note.path = path.join("notes", index.year, note.slug + ".html");
            note.link = note.path.replace(/\\/g, "/");
            note.permalink = config.url + "/" + note.link;

            note.excerpt = note.excerpt.replace("/images/", "/notes/" + index.year + "/images/"); /** HACK */
            note.content = note.content.replace("/images/", "/notes/" + index.year + "/images/"); /** HACK */

            //console.log(note);

            if (!note.hide) {

                // add note to result
                result.push({
                    data: note,
                    path: note.path,
                    layout: "note"
                });

                //... and to index notes list
                index.notes.push(note);
            }
        });

        index.notes.sort(function(a, b) {
            return new Date(b.date) - new Date(a.date);
        });
    
        if (index.notes.length > 0) {
            indexes.push(index);
            log.info(magenta(index.notes.length) + " Notes for " + magenta(index.year));
            processImages(yearDir, index.year);
    }

        // console.log("\n====================================================\n");
        // console.log(index);

    });
    //console.log(indexes);

    let yearsAvailable = indexes.map(index => index.year);
    let yearList = years
        .filter(item => (yearsAvailable.includes(item.year)))
        .sort((a, b) => b.year - a.year);
    // console.log(yearList);

    indexes.forEach(index => {
        index.years = yearList;
        // console.log(index);

        // add year index to result
        result.push({
            data: index,
            path: path.join(index.path),
            layout: "notes-index"
        });

        // add root index for current year
        if (index.year == currentYear) {
            result.push({
                data: index,
                path: path.join("notes", "index.html"),
                layout: "notes-index"
            });
        }

    });

    return result;
});

function getMDInfo(filePath, obj, parseContent) {

    let md = fs.readFileSync(filePath);
    let fm = front.parse(md);
    obj = {...obj, ...fm};

    if (parseContent) {
        let content = obj._content.split("\n<!-- more -->\n");

        if (content.length === 2) {
            obj.content = hexo.render.renderSync({ text: content.join("\n"), engine: 'markdown' });
            obj.excerpt = hexo.render.renderSync({ text: content[0], engine: 'markdown' });
            obj.more = true;
        } else {
            obj.content = hexo.render.renderSync({ text: obj._content, engine: 'markdown' });
            obj.excerpt = obj.content 
            obj.more = false;
        }

        // console.log(obj);

        //obj.content = highlight(obj.content, config.highlight);
    }
    return obj;
}

function processImages(sourceDir, year) {

    let imageDir = path.join(sourceDir, "images");
    
    // get images of notes
    let images = fs
        .readdirSync(imageDir)
        .filter(entry => fs.statSync(path.join(imageDir, entry)).isFile())
        .filter(file => file.match(/.*.(jpg|jpeg|png)/g))
        .map(entry => ({
            file: entry,
        }));
    // console.log(images);

    if (images.length > 0) {
        // set absolute paths
        let sourcePath = path.join(hexo.source_dir, "_" + "notes", year, "images");
        let targetPath = path.join(hexo.public_dir, "notes", year, "images");
        // console.log(sourcePath);
        // console.log(targetPath);

        if (!fs.existsSync(targetPath)) { 
            fs.mkdirSync(targetPath, { recursive: true }); 
        }

        // extend image path info
        images.forEach(image => {
            // console.log(image);
            image.source = path.join(sourcePath, image.file);
            image.target = path.join(targetPath, image.file);

            if (!fs.existsSync(image.target)) {
                //fs.copyFile(image.source, image.target);
                sharp(image.source)
                    .resize({ width: 600 })
                    .toFile(image.target)
                    .then(function(newFileInfo) {

                        let imageMinPlugins = [];

                        if (newFileInfo.format === 'jpg' || type === 'jpeg') {
                            imageMinPlugins.push(imageminMozJpeg());
                        }
                        if (newFileInfo.format === 'png') {
                            imageMinPlugins.push(imageminPngquant());
                        }

                        if (imageMinPlugins.length > 0) {
                            imagemin([image.target], { plugins: imageMinPlugins })
                                .then(files => {
                                    log.info("Note image '" + magenta(image.file) + "' resized and compressed");
                                });
                        } else {
                            log.info("Note image '" + magenta(image.file) + "' resized");
                        }
                    })
                    .catch(function(err) {
                        log.warn("Error on resizing note image '" + image.file + "': " + err);
                    });

            }
        });
        //console.log(images);
    }
}