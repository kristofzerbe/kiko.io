/**
 * This is only for executing the generator manually. 
 * 
 * Execution:
 * node "./lib/_run_discoveries-converter.cjs" "35 - Lorem Ipsum"
 */

const DiscoveriesConverter = require("./discoveries-converter.cjs").DiscoveriesConverter;

const folderName = process.argv[2].toString();

const dc = new DiscoveriesConverter(folderName);
dc.convert();