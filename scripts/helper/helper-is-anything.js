const path = require('path');
const fs = require('hexo-fs');

//TODO: DOES NOT WORK FOR proejct(s)

hexo.extend.helper.register('is_anything', function(value){
  let filePath = path.join(this.config.source_dir, "_anything", value, "index.md");
  return fs.existsSync(filePath);
});