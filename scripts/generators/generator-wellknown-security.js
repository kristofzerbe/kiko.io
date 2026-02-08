const log = require('hexo-log')({ debug: false, silent: false });
const { magenta } = require('chalk');

hexo.extend.generator.register("wellknown-security", function() {
  const _path = ".well-known/security.txt";

  log.info("Generating File " + magenta(_path));

  const expires = new Date();
  expires.setMonth(6);

  let content = `
Contact: mailto:${hexo.config.email}
Expires: ${expires.toISOString()}
Preferred-Languages: de,en
Canonical: ${hexo.config.url}/${_path}
  `

  return {
    path: _path,
    data: content
  }

});