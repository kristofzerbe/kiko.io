
/**
 * This is only for executing the generator manually. 
 * Refer to /scripts/on-ready-generate-social-media-images.js to see how it runs automatically in Hexo.
 * 
 * Execution:
 * node "./lib/_run_social-media-image-generator-for-posts.cjs" "../static/photos/normal" "../templates/social-media-image.handlebars" "../static/images/social-media" "../source/_posts"
 */

const SocialMediaImageGenerator = require("./social-media-image-generator.cjs").SocialMediaImageGenerator;

const photoFolder = process.argv[2].toString();
const templateFile = process.argv[3].toString();
const targetFolder = process.argv[4].toString();

const postFolder = process.argv[5].toString();

const generator = new SocialMediaImageGenerator(photoFolder, templateFile, targetFolder);
generator.generateForPosts(postFolder);