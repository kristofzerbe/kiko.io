/**
 * This is only for executing the generator manually. 
 * 
 * Execution:
 * node "./lib/_run_discoveries-generator.cjs" "21" "Discoveries Sites & Pages"
 */

const Generator = require("./discoveries-generator.cjs").Generator;

const discoveryNo = process.argv[2].toString();
const listName = process.argv[3].toString();

const generator = new Generator(discoveryNo, listName);
generator.generate();