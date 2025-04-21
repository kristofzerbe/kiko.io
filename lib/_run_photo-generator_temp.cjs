
/**
 * This is only for executing the selector manually. 
 * 
 * Execution:
 * node "./lib/_run_photo-generator_temp.cjs"
 */

const PhotoGenerator = require("./photo-generator.cjs").PhotoGenerator;

const inboundFolder = "../photos_new";
const originalFolder = null;
const tempFolder = "../~temp";

const generator = new PhotoGenerator(inboundFolder, originalFolder, tempFolder);
generator.generate();
