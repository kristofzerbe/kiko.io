/**
 * This is only for executing the generator manually. 
 * 
 * Execution:
 * node ./lib/_run_linkjournal-converter.cjs 26-03 D50_6820_2509
 * or 
 * npm run linkjournal 26-04 D50_6820_2509 --(see package.json)
 */

const LinkJournalConverter = require("./linkjournal-converter.cjs").LinkJournalConverter;

if (process.argv.length < 4) {
  console.error("Too few arguments. Need 'yearMonth' and 'poolImageName'");
  return;
}
const yearMonth = process.argv[2].toString();
const poolImageName = process.argv[3].toString();

const ljc = new LinkJournalConverter(yearMonth, poolImageName);
ljc.convert();