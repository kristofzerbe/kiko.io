/**
 * This is only for executing the generator manually. 
 * 
 * Execution:
 * node "./lib/_run_tiny-tools-generator.cjs"
 */

const TinyToolsGenerator = require("./tiny-tools-generator.cjs").TinyToolsGenerator;

const generator = new TinyToolsGenerator();
generator.generate();