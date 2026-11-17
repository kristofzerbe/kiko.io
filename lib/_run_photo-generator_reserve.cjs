
/**
 * This is only for executing the selector manually. 
 * 
 * Execution:
 * node "./lib/_run_photo-generator_reserve.cjs"
 */

const PhotoGenerator = require("./photo-generator.cjs").PhotoGenerator;

const inboundFolder = "../photos_new";
const originalFolder = "../photos_original";
const reserveFolder = "../static/reserve";

const generator = new PhotoGenerator(inboundFolder, originalFolder, reserveFolder);
generator.generate();
