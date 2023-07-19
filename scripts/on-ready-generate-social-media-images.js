const SocialMediaImageGenerator = require("../lib/social-media-image-generator.cjs").SocialMediaImageGenerator;

hexo.on("ready", function() {
    
    const postFolder = "../source/_posts";
    const photoFolder = "../static/photos/normal";
    const templateFile = "../templates/social-media-image.handlebars";
    const targetFolder = "../static/images/social-media";

    const generator = new SocialMediaImageGenerator(postFolder, photoFolder, templateFile, targetFolder);
    generator.generate();

});