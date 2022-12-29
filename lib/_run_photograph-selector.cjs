
/**
 * This is only for executing the selector manually. 
 * 
 * Execution:
 * node "./lib/_run_photograph-selector.cjs"
 */

const Selector = require("./photograph-selector.cjs").Selector;

const selector = new Selector();
let photo = selector.pick();

console.log(photo);
