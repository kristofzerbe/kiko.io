
/**
 * Execution:
 * node "./lib/run-social-media-images.cjs" "../source/_posts" "../static/photos/normal" "../templates/social-media-image.handlebars" "../static/social-media"
 */

 const Generator = require("./social-media-image-generator.cjs").Generator;

 const postFolder = process.argv[2].toString();
 const photoFolder = process.argv[3].toString();
 const templateFile = process.argv[4].toString();
 const targetFolder = process.argv[5].toString();
 console.log(postFolder);

 const generator = new Generator(postFolder, photoFolder, templateFile, targetFolder);
 generator.generate();