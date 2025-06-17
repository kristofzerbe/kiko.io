/**
 * This is only for executing the generator manually. 
 * 
 * Execution:
 * node "./lib/_run_discoveries-generator.cjs" "35 - Lorem Ipsum"
 */

const DiscoveriesGenerator = require("./discoveries-generator.cjs").DiscoveriesGenerator;

const folderName = process.argv[2].toString();

const generator = new DiscoveriesGenerator(folderName);
generator.generate();