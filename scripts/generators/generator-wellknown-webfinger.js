const log = require('hexo-log')({ debug: false, silent: false });
const { magenta } = require('chalk');
const axios = require("axios");

hexo.extend.generator.register("wellknown-webfinger", async function() {
  log.info("Generating File " + magenta(".well-known/webfinger"));

  const config = this.config;

  if(hexo.status === "offline") { 
    log.error("NO NETWORK CONNECTION FOR WEBFINGER GENERATION");
    return null;
  }

  let mastodonUrl = config.profiles.mastodon.split("@");
  let mastodonServer = mastodonUrl[0];
  let mastodonHost = mastodonServer.replaceAll("/","").replace("https:", "");
  let mastodonUser = mastodonUrl[1];

  const url = 
    `${mastodonServer}.well-known/webfinger?resource=acct:${mastodonUser}@${mastodonHost}`;

  const _path = ".well-known/webfinger";

  //TODO: deactivated due to DNS problems @ 2025-07-02
  // axios.get(url).then(response => {
  //   let json = response.data;
  //   hexo.route.set(_path, json);
  // });
  let json = `
  {
    "subject":"acct:kiko@indieweb.social",
    "aliases":["https://indieweb.social/@kiko","https://indieweb.social/users/kiko"],
    "links":[
      {"rel":"http://webfinger.net/rel/profile-page","type":"text/html","href":"https://indieweb.social/@kiko"},
      {"rel":"self","type":"application/activity+json","href":"https://indieweb.social/users/kiko"},
      {"rel":"http://ostatus.org/schema/1.0/subscribe","template":"https://indieweb.social/authorize_interaction?uri={uri}"},
      {"rel":"http://webfinger.net/rel/avatar","type":"image/png","href":"https://cdn.masto.host/indiewebsocial/accounts/avatars/109/335/735/147/916/622/original/fe70df1a31593609.png"}
    ]
  }
  `;
  hexo.route.set(_path, json);
});
