const PoolPhotoGenerator = require("../lib/pool-photo-generator.cjs").PoolPhotoGenerator;

hexo.on("ready", function() {
    
  const inboundFolder = "../new_photos";
  const poolFolder = "../static/pool";

  const generator = new PoolPhotoGenerator(inboundFolder, poolFolder);
  generator.generate();

});