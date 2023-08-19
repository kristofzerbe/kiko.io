
/**
 * This is only for executing the selector manually. 
 * 
 * Execution:
 * node "./lib/_run_pool-photo-generator.cjs"
 */

const PoolPhotoGenerator = require("../lib/pool-photo-generator.cjs").PoolPhotoGenerator;

const inboundFolder = "../new_photos";
const poolFolder = "../static/pool";

const generator = new PoolPhotoGenerator(inboundFolder, poolFolder);
generator.generate();
