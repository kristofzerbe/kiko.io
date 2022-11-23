// const log = require('hexo-log')({ debug: false, silent: false });
// const path = require('path');
// const fs = require('hexo-fs');
// const front = require('hexo-front-matter');

// hexo.extend.generator.register('notes', function(locals) {

//     let config = this.config;
//     let sourceDir = path.join(config.source_dir, "_" + config.notes_dir);
//     let currentYear = new Date().getFullYear();

//     // collection of pages to render
//     let result = [];

//     log.info("Processing Notes...");

//     // init index page
//     let index = {};
//     index.name = "notes";

//     // process index file
//     index = {...index, ...getMDInfo(path.join(sourceDir, "index.md"), index. false)};
//     // console.log(index);

//     // get processed notes
//     let notes = getNotes(sourceDir);
//     //console.log(notes);

//     // sort notes by date DESC
//     notes.sort(function(a, b) {
//         return new Date(b.date) - new Date(a.date);
//     });

//     // group notes by year
//     const yearNotes = notes.reduce((group, note) => {
//         const { year } = note;
//         group[year] = group[year] ?? [];
//         group[year].push(note);
//         return group;
//     }, {});
//     //console.log(yearNotes);

//     // get list of years, sort descending and create object list
//     index.years = Object.keys(yearNotes)
//         .map(year => year)
//         .sort((a, b) => b - a)
//         .map(year => ({
//             year: year,
//             path: "/notes/" + ((year == currentYear) ? "index.html" : year + ".html")
//         }));

//     // create index pages for all years
//     Object.keys(yearNotes).forEach(function(year, i) {
//         // console.log(year);
//         // console.log(yearNotes[year]);

//         // create new index object for year
//         let indexYear = Object.assign({}, index); //clone
//         indexYear.year = year;
//         //console.log(indexYear);

//         // set items of year
//         indexYear.notes = yearNotes[year].map(note => ({
//             key: note.key,
//             title: note.title,
//             date: note.date,
//             excerpt: note.excerpt,
//             more: note.more
//         }));

//         console.log("\n====================================================\n");
//         console.log(indexYear);

//         //Add year to result
//         result.push({
//             data: indexYear,
//             path: path.join(config.notes_dir, ((year == currentYear) ? "index.html" : year + ".html")),
//             layout: "notes-index"
//         });
//     });

//     //TODO: Add all remaining notes to result

//     // get images of notes
//     let images = getImages(path.join(sourceDir, "images"))
//     // ... and extend path info
//     images.forEach(image => {
//         image.source = path.join(sourceDir, image.file);
//         image.target = path.join(config.public_dir, "notes", "images", image.file);
//     });
//     //console.log(images);

//     return result;
// });

// function getNotes(sourceDir) {

//     let notes = [];

//     let files = fs
//         .readdirSync(sourceDir)
//         .filter(entry => fs.statSync(path.join(sourceDir, entry)).isFile())
//         .filter(file => file.match(/\d{2}-\d{2}-\d{2}-.*.md/g))
//         .map(entry => ({ 
//             file: entry,
//             key: entry.replace(".md", "").replace(/\d{2}-\d{2}-\d{2}-/g, ""),
//             year: parseInt("20" + entry.substring(0,2))
//         }));

//     files.forEach(note => {
//         note = {...note, ...getMDInfo(path.join(sourceDir, note.file), note, true) }
//         // console.log(note);

//         //TODO: remove all notes which exists in output folder

//         notes.push(note);
//     });

//     return notes;
// }

// function getMDInfo(filePath, obj, parseContent) {

//     let md = fs.readFileSync(filePath);
//     let fm = front.parse(md);
//     obj = {...obj, ...fm};

//     if (parseContent) {
//         let content = obj._content.split("\n<!-- more -->\n");
//         obj.content = hexo.render.renderSync({ text: content[0], engine: 'markdown' });
    
//         if (content.length === 2) {
//             obj.excerpt = hexo.render.renderSync({ text: content[1], engine: 'markdown' });
//             obj.more = true;
//         } else {
//             obj.excerpt = obj.content;
//             obj.more = false;
//         }    
//     }
//     return obj;
// }


// function getImages(sourceDir) {

//     let files = fs
//         .readdirSync(sourceDir)
//         .filter(entry => fs.statSync(path.join(sourceDir, entry)).isFile())
//         .filter(file => file.match(/.*.(jpg|jpeg|png)/g))
//         .map(entry => ({ 
//             file: entry,
//         }));
        
//     return files;
// }

// function copyImages() {
    
// }