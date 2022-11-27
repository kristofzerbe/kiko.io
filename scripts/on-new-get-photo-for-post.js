/* to take a specified photo, prefix wanted pool folder with a "#" first
 */
const log = require('hexo-log')({
    debug: false,
    silent: false
});
const front = require('hexo-front-matter');
const fs = require('hexo-fs');

hexo.on('new', function(data) {

    log.info("Processing Photo...");

    var post = front.parse(data.content);

    var poolDir = hexo.source_dir.replace("\source", hexo.config.static_dir + "\\" + hexo.config.pool_dir);
    var photosDir = hexo.source_dir.replace("\source", hexo.config.static_dir) + "\\" + hexo.config.photo_dir;

    var files = fs.listDirSync(poolDir);

    var metafile;
    var photoFolder;
    var photoName;
    var info;
    //try to find a folder with #-suffix to take as next photo
    var metaFiles = files.filter(file => file.match(/#.*[\\]meta.txt/g));
    if (metaFiles.length === 1) { 
        metaFile = metaFiles[0];
        photoFolder = metaFile.split("\\")[0];
        photoName = metaFile.split("\\")[0].substring(1);
        info = "Specified Pick";
    } else { //nothing found ... take all and pick randomly
        metaFiles = files.filter(file => file.match(/.*[\\]meta.txt/g));
        metaFile = metaFiles[Math.floor(Math.random() * metaFiles.length)];
        photoFolder = metaFile.split("\\")[0];
        photoName = metaFile.split("\\")[0];
        info = "Random Pick";
    }
    
    var meta = fs.readFileSync(poolDir + "\\" + metaFile);
    var metas = meta.split("\n");
    log.info(info + ": " + photoFolder + " (" + photoName + ") => " + metas[0] + " | " + metas[1]);

    post.photograph.file = photoName + ".jpg";
    post.photograph.name = metas[0];
    post.photograph.link = metas[1];

    postStr = front.stringify(post);
    postStr = '---\n' + postStr;

    fs.writeFile(data.path, postStr, 'utf-8');
    
    function poolSrc(type) {
        return poolDir + "\\" + photoFolder + "\\" + type + ".jpg"
    }
    function photoDest(type) {
        return photosDir + "\\" + type + "\\" + photoName + ".jpg"
    }
    function copyFile(src, dest) {
        log.info("COPY " + src + " TO " + dest);
        fs.copyFile(src, dest);
    }

    //INFO: Interim approach
    copyFile(poolSrc("normal"), photoDest("normal"));
    copyFile(poolSrc("tablet"), photoDest("tablet"));
    copyFile(poolSrc("mobile"), photoDest("mobile"));

    setTimeout(function() {
        log.info("REMOVE " + poolDir + "\\" + photoFolder);
        fs.rmdirSync(poolDir + "\\" + photoFolder);
    }, 3000);


    //TODO: Doesn't work, because callback is not triggered on fs.copyFile
    // function copyFileAsync(src, dest) {
    //     return new Promise(function(resolve) {
    //         log.info("COPY " + src + " TO " + dest);
    //         try {
    //             fs.copyFile(src, dest, function() {
    //                 log.info("COPY DONE");
    //                 resolve();
    //             });
    //         } catch (error) {
    //             log.info(error);
    //         }
            
    //     });
    // };

    // copyFileAsync(poolSrc("normal"), photoDest("normal"))
    // .then(function() {
    //     copyFileAsync(poolSrc("tablet"), photoDest("tablet"));
    // })
    // .then(function() {
    //     copyFileAsync(poolSrc("mobile"), photoDest("mobile"));
    // })
    // .then(function() {
    //     fs.rmdirSync(poolDir + "\\" + photoName);
    //     log.info("Processing Photo... done");
    // });

});