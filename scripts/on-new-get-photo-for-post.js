/* to take a specified photo, prefix wanted pool folder with a "#" first
 */
const log = require('hexo-log')({
    debug: false,
    silent: false
});
const front = require('hexo-front-matter');
const fs = require('hexo-fs');

const photoSelector = require("../lib/photograph-selector.cjs").Selector;

hexo.on('new', function(data) {

    log.info("Processing Photo...");

    let post = front.parse(data.content);

    const selector = new photoSelector();
    post.photograph = selector.pick();

    let postStr = front.stringify(post);
    postStr = '---\n' + postStr;

    fs.writeFile(data.path, postStr, 'utf-8');
    
});