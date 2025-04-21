
/**
 * This is only for executing the selector manually. 
 * 
 * Execution:
 * node "./lib/_run_photo-generator_shed.cjs"
 */

const PhotoGenerator = require("./photo-generator.cjs").PhotoGenerator;

const inboundFolder = "../photos_new";
const originalFolder = "../photos_original";
const shedFolder = "../static/shed";

const generator = new PhotoGenerator(inboundFolder, originalFolder, shedFolder);
generator.generate();
