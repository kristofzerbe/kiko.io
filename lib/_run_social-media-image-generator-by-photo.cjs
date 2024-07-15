
/**
 * This is only for executing the generator manually. 
 * Refer to /scripts/on-ready-generate-social-media-images.js to see how it runs automatically in Hexo.
 * 
 * Execution:
 * node "./lib/_run_social-media-image-generator-by-photo.cjs" "../static/photos/normal" "../templates/social-media-image.handlebars" "../static/images/social-media" "$19-05-Israel-0228.jpg" "#test-123" "A Test" "... to see if it works" "TEST"
 */

 const SocialMediaImageGenerator = require("./social-media-image-generator.cjs").SocialMediaImageGenerator;

 const photoFolder = process.argv[2].toString();
 const templateFile = process.argv[3].toString();
 const targetFolder = process.argv[4].toString();

 const photoFile = process.argv[5].toString();
 const fileSlug = process.argv[6].toString();
 const title = process.argv[7].toString();
 const subtitle = process.argv[8].toString();
 const category = process.argv[9].toString();

 const generator = new SocialMediaImageGenerator(photoFolder, templateFile, targetFolder);
 generator.generateByPhoto(photoFile, fileSlug, title, subtitle, category);