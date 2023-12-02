const log = require('hexo-log')({ debug: false, silent: false });

const axios = require("axios");

hexo.extend.generator.register("wellknown-webfinger", async function() {

  log.info("Processing .well-known/webfinger ...");

  const url = 
    `https://${this.config.mastodon.server}/.well-known/webfinger?resource=acct:${this.config.mastodon.user}@${this.config.mastodon.server}`;

  const _path = ".well-known/webfinger";

  axios.get(url).then(response => {
    let json = response.data;
    hexo.route.set(_path, json);
  });

});
