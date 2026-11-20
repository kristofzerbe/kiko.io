'use strict';

/**
 * node "./lib/download-fotovorschlag-toots.cjs"
 */

require('dotenv').config();

const fs = require("fs");
const path = require("path");
const yaml = require('js-yaml');
const { open, writeFile } = require('node:fs/promises');
const { red, yellow, green } = require('chalk');

const _currentPath = __dirname;
const _rootPath = path.join(_currentPath, "../");
const _config = yaml.load(fs.readFileSync('./_config.yml', 'utf8'));

const fvDir = path.join(_rootPath, _config.data_dir, _config.fotovorschlag.data_folder);

const statusUrl = `https://${_config.mastodon.server}/api/v1/accounts/${_config.mastodon.user_id}/statuses?limit=40`; //max limit
//https://docs.joinmastodon.org/methods/accounts/#statuses

(async () => {

  try {
    const resToots = await fetch(statusUrl);
    if (!resToots.ok) throw new Error(`${resToots.status}: ${resToots.statusText}`);
    const toots = await resToots.json();

    toots.forEach(async toot => {

      if (toot.tags.some(tag => tag['name'].toLowerCase() === "fotovorschlag") && 
          toot.content.includes("https://kiko.io/photos")) {

        const fvFilename = toot.created_at.split('T')[0] + "_" + toot.id + ".json";
        const fvFile = path.join(fvDir, fvFilename);

        if (!fs.existsSync(fvFile)) {
          let fv = {
            url: toot.url,
            created: toot.created_at.split('T')[0],
            topic: toot.content.match(/(?<=&#39;|').*?(?=&#39;|')/)?.[0] ?? null,
            topic_en: null,
            replyto: {
              id: toot.in_reply_to_id,
              url: null
            } 
          }

          const tootUrl = new URL(toot.url);
          const resReply = await fetch(`${tootUrl.origin}/api/v1/statuses/${toot.in_reply_to_id}`);
          if (!resReply.ok) throw new Error(`${resReply.status}: ${resReply.statusText}`);
          const reply = await resReply.json();
          fv.replyto.url = reply.url;

          const deeplAPI = `${_config.deepl_api_base_url}/v2/translate`;
          const deeplKey = process.env.DEEPL_API_KEY;
          const deeplOptions = {
            method: "POST",
            headers: {
              "Authorization": `DeepL-Auth-Key ${deeplKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              text: [`${fv.topic}`],
              target_lang: "EN"
            })
          }
          const resTrans = await fetch(deeplAPI, deeplOptions);
          if (!resTrans.ok) throw new Error(`${resTrans.status}: ${resTrans.statusText}`);
          const trans = await resTrans.json();
          fv.topic_en = trans.translations[0].text;

          console.log(green(`Fotovorschlag Toot ${fvFilename} downloaded`));
          fs.writeFileSync(fvFile, JSON.stringify(fv));
        }

      }
    });

  } catch (error) {
      console.error(red(`Error reading toots from host ${_config.mastodon.server}: ${error.message}`));
  }

})();