/**
 * This is only for executing the generator manually. 
 * 
 * Execution:
 * node "./lib/_run_concerts-generator.cjs"
 */

const ConcertsGenerator = require("./concerts-generator.cjs").ConcertsGenerator;

const generator = new ConcertsGenerator();
generator.generate();