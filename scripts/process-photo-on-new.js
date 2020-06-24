const log = require('hexo-log')({
    debug: false,
    silent: false
});
const front = require('hexo-front-matter');
const fs = require('hexo-fs');

hexo.on('new', function(data){
    log.info("Processing Photo...");

    var post = front.parse(data.content);

    var poolDir = hexo.source_dir.replace("\source", hexo.config.static_dir) + "pool";
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

    fs.copyFile(
        poolDir + "\\" + photoName + "\\normal.jpg", 
        photosDir + "\\normal\\" + photoName + ".jpg", 
        function() {
            fs.copyFile(
                poolDir + "\\" + photoName + "\\tablet.jpg", 
                photosDir + "\\tablet\\" + photoName + ".jpg", 
                function() {
                fs.copyFile(
                    poolDir + "\\" + photoName + "\\mobile.jpg", 
                    photosDir + "\\mobile\\" + photoName + ".jpg", 
                    function() {
                        fs.rmdirSync(poolDir + "\\" + photoName);
                });
            });
    });

    log.info("Processing Photo... done");
});