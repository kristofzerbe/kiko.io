const log = require('hexo-log')({ debug: false, silent: false });
const path = require('path');
const fs = require('hexo-fs');

hexo.extend.generator.register("wellknown-webfinger", async function() {

  log.info("Processing .well-known/webfinger file...");

  const _rootPath = hexo.base_dir;
  const _path = ".well-known/webfinger";

  let content = "";

  let filePath = path.join(_rootPath, this.config.static_dir, _path);
  if (fs.existsSync(filePath)) { 
    json = JSON.parse(fs.readFileSync(filePath)); 
    content = JSON.stringify(json); // flatten JSON
  }

  let result = {
      data: content,
      path: _path
  };

  return result;

});
