const Generator = require("../lib/social-media-image-generator.cjs").Generator;

hexo.on("ready", function() {
    
    const postFolder = "../source/_posts";
    const photoFolder = "../static/photos/normal";
    const templateFile = "../templates/social-media-image.handlebars";
    const targetFolder = "../static/images/social-media";

    const generator = new Generator(postFolder, photoFolder, templateFile, targetFolder);
    generator.generate();

});