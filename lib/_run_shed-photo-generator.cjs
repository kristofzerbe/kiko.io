
/**
 * This is only for executing the selector manually. 
 * 
 * Execution:
 * node "./lib/_run_shed-photo-generator.cjs"
 */

const PhotoGenerator = require("../lib/photo-generator.cjs").PhotoGenerator;

const inboundFolder = "../photos_new";
const originalFolder = "../photos_original";
const shedFolder = "../static/shed";

const generator = new PhotoGenerator(inboundFolder, originalFolder, shedFolder);
generator.generate();
