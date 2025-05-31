/**
 * This is only for executing the generator manually. 
 * 
 * Execution:
 * node "./lib/_run_discoveries-generator.cjs" "Discoveries #26 - JavaScript HowTo's"
 */

const DiscoveriesGenerator = require("./discoveries-generator.cjs").DiscoveriesGenerator;

const listName = process.argv[2].toString();

let doPhoto = true;
if (process.argv.length === 4) {
    doPhoto = process.argv[3];
}

const generator = new DiscoveriesGenerator(listName, doPhoto);
generator.generate();