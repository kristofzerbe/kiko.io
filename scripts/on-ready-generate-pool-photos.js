const PoolPhotoGenerator = require("../lib/pool-photo-generator.cjs").PoolPhotoGenerator;

hexo.on("ready", function() {
    
  const inboundFolder = "../photos_new";
  const originalFolder = "../photos_original_transfer";
  const poolFolder = "../static/pool";

  const generator = new PoolPhotoGenerator(inboundFolder, originalFolder, poolFolder);
  generator.generate();

});