const log = require('hexo-log')({
    debug: false,
    silent: false
});
const front = require('hexo-front-matter');
const fs = require('hexo-fs');

hexo.on('new', function(data){
    log.info("Processing Photo...");

    var post = front.parse(data.content);

    var poolDir = hexo.source_dir.replace("\source", hexo.config.pool_dir);
    var photosDir = hexo.source_dir.replace("\source", hexo.config.static_dir) + "photos";
    
    var files = fs.listDirSync(poolDir);
    var metaFiles = files.filter(file => file.match(/.*[\\]meta.txt/g));
    
    var metaFile = metaFiles[Math.floor(Math.random() * metaFiles.length)];
    var photoName = metaFile.split("\\")[0];
    
    var meta = fs.readFileSync(poolDir + "\\" + metaFile);
    var metas = meta.split("\n");
    log.info("Random Pick: " + photoName + " => " + metas[0] + " | " + metas[1]);

    post.photograph.file = photoName + ".jpg";
    post.photograph.name = metas[0];
    post.photograph.link = metas[1];

    postStr = front.stringify(post);
    postStr = '---\n' + postStr;

    fs.writeFile(data.path, postStr, 'utf-8');
    
    function poolSrc(type) {
        return poolDir + "\\" + photoName + "\\" + type + ".jpg"
    }
    function photoDest(type) {
        return photosDir + "\\" + type + "\\" + photoName + ".jpg"
    }

    //INFO: Interim approach
    function copyFile(src, dest) {
        log.info("COPY " + src + " TO " + dest);
        fs.copyFile(src, dest);
    }
    copyFile(poolSrc("normal"), photoDest("normal"));
    copyFile(poolSrc("tablet"), photoDest("tablet"));
    copyFile(poolSrc("mobile"), photoDest("mobile"));
    setTimeout(function() {
        log.info("REMOVE " + poolDir + "\\" + photoName);
        fs.rmdirSync(poolDir + "\\" + photoName);
    }, 2000)

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