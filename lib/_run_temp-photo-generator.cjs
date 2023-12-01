
/**
 * This is only for executing the selector manually. 
 * 
 * Execution:
 * node "./lib/_run_temp-photo-generator.cjs"
 */

const PhotoGenerator = require("../lib/photo-generator.cjs").PhotoGenerator;

const inboundFolder = "../photos_original";
const originalFolder = null;
const tempFolder = "../~temp";

const generator = new PhotoGenerator(inboundFolder, originalFolder, tempFolder);
generator.generate();
