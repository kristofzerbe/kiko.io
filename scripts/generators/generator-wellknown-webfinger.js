const log = require('hexo-log')({ debug: false, silent: false });
const { magenta } = require('chalk');
const axios = require("axios");

hexo.extend.generator.register("wellknown-webfinger", async function() {
  log.info("Generating File " + magenta(".well-known/webfinger"));

  let mastodonUrl = this.config.profiles.mastodon.split("@");
  let mastodonServer = mastodonUrl[0];
  let mastodonHost = mastodonServer.replaceAll("/","").replace("https:", "");
  let mastodonUser = mastodonUrl[1];

  const url = 
    `${mastodonServer}.well-known/webfinger?resource=acct:${mastodonUser}@${mastodonHost}`;

  const _path = ".well-known/webfinger";

  axios.get(url).then(response => {
    let json = response.data;
    hexo.route.set(_path, json);
  });

});
