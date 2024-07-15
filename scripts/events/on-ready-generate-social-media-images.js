const SocialMediaImageGenerator = require("../../lib/social-media-image-generator.cjs").SocialMediaImageGenerator;

hexo.on("ready", function() {
    
    const photoFolder = "../static/photos/normal";
    const templateFile = "../templates/social-media-image.handlebars";
    const targetFolder = "../static/images/social-media";

    const generator = new SocialMediaImageGenerator(photoFolder, templateFile, targetFolder);
    generator.generateForPosts("../source/_posts");

});