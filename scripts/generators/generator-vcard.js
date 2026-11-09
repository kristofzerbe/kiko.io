const log = require('hexo-log')({ debug: false, silent: false });
const { magenta } = require('chalk');

//https://en.wikipedia.org/wiki/VCard
//https://www.rfc-editor.org/info/rfc9554/

hexo.extend.generator.register("vcard", function() {
  log.info("Generating vCards");

  let result = [];
  let path;

  let content = `BEGIN:VCARD
VERSION:4.0
FN:${hexo.config.author}
ADR;TYPE=HOME:${hexo.config.address}
TZ:${hexo.config.timezone}
EMAIL;TYPE=HOME:${hexo.config.email}
URL;TYPE=HOME:${hexo.config.url}
SOCIALPROFILE;SERVICE-TYPE=Mastodon:${hexo.config.profiles.mastodon}
SOCIALPROFILE;SERVICE-TYPE=LinkedIn:${hexo.config.profiles.linkedin}
SOURCE:${hexo.config.url}/__PATH__
END:VCARD`;

  path = "kristof-zerbe.vcf";
  result.push({
    path: path,
    data: content.replace("__PATH__", path)
  });

  // for https://contactspec.org
  path = ".well-known/contact.vcf";
  result.push({
    path: path,
    data: content.replace("__PATH__", path)
  });

  return result;
});
