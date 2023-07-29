
/**
 * This is only for executing the generator manually. 
 * Refer to /scripts/on-ready-generate-social-media-images.js to see how it runs automatically in Hexo.
 * 
 * Execution:
 * node "./lib/_run_social-media-image-generator.cjs" "../source/_posts" "../static/photos/normal" "../templates/social-media-image.handlebars" "../static/images/social-media"
 */

 const SocialMediaImageGenerator = require("./social-media-image-generator.cjs").SocialMediaImageGenerator;

 const postFolder = process.argv[2].toString();
 const photoFolder = process.argv[3].toString();
 const templateFile = process.argv[4].toString();
 const targetFolder = process.argv[5].toString();
 console.log(postFolder);

 const generator = new SocialMediaImageGenerator(postFolder, photoFolder, templateFile, targetFolder);
 generator.generate();