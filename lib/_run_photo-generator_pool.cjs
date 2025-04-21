
/**
 * This is only for executing the selector manually. 
 * 
 * Execution:
 * node "./lib/_run_photo-generator_pool.cjs"
 */

const PhotoGenerator = require("./photo-generator.cjs").PhotoGenerator;

const inboundFolder = "../photos_new";
const originalFolder = "../photos_original";
const poolFolder = "../static/pool";

const generator = new PhotoGenerator(inboundFolder, originalFolder, poolFolder);
generator.generate();
