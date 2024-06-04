const path = require('path');
const fs = require('hexo-fs');

hexo.extend.helper.register('is_dynamic', function(value){
  let filePath = path.join(this.config.source_dir, "_dynamic", value + ".md");
  return fs.existsSync(filePath);
});