
/**
 * This is only for executing the selector manually. 
 * 
 * Execution:
 * node "./lib/_run_pool-photo-generator.cjs"
 */

const PoolPhotoGenerator = require("../lib/pool-photo-generator.cjs").PoolPhotoGenerator;

const inboundFolder = "../photos_new";
const originalFolder = "../photos_original";
const poolFolder = "../static/pool/~temp";

const generator = new PoolPhotoGenerator(inboundFolder, originalFolder, poolFolder);
generator.generate();
