/**
 * This is only for executing the generator manually. 
 * 
 * Execution:
 * node "./lib/_run_discoveries-generator.cjs" "21" "Discoveries Sites & Pages"
 */

const Generator = require("./discoveries-generator.cjs").Generator;

const listName = process.argv[2].toString();

let doPhoto = true;
if (process.argv.length === 4) {
    doPhoto = process.argv[3];
}

const generator = new Generator(listName, doPhoto);
generator.generate();