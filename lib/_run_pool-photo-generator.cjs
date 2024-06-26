
/**
 * This is only for executing the selector manually. 
 * 
 * Execution:
 * node "./lib/_run_pool-photo-generator.cjs"
 */

const PhotoGenerator = require("../lib/photo-generator.cjs").PhotoGenerator;

const inboundFolder = "../photos_new";
const originalFolder = "../photos_original";
const poolFolder = "../static/pool";

const generator = new PhotoGenerator(inboundFolder, originalFolder, poolFolder);
generator.generate();
