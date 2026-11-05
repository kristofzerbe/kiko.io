require('dotenv').config();

const path = require('path');
const fs = require('hexo-fs');

let _hexo;
let _rootDir;
let _synFile;
let _synJson;
let _links;

class SynCollector_Fotovorschlag {
  
  constructor(hexo, links) {
    _hexo = hexo;
    _links = links;

    _rootDir = hexo.source_dir.replace("source", "");
    
    _synFile = path.join(_rootDir, _hexo.config.static_dir, "photo-syn-fotovorschlag.json");
    if (fs.existsSync(_synFile)) {
      _synJson = JSON.parse(fs.readFileSync(_synFile));
      //console.log(synJson);
    }
  }

  process() {

    let newSyn = 0;
    let fetches = [];

    let deeplAPI = `${_hexo.config.deepl_api_base_url}/v2/translate`;
    let deeplKey = process.env.DEEPL_API_KEY;
    //console.log(deeplAPI + ": " + deeplKey);

    _links.forEach(link => {

      let syn = _synJson.syndications.find(s => s.key === link.key && s.url === link.url);
      //console.log("FOTOVORSCHLAG " + ((syn)?"DONE":"... ") + ": " + link.key + " @ " + link.url);

      if (!syn) {
        console.log("FOTOVORSCHLAG NEW: " + link.key + " @ " + link.url);

        newSyn += 1;

        syn = {
          "key": link.key,
          "url": link.url,
          "created": "",
          "topic": "",
          "topic_en": "",
          "replyto": {
            "id": "",
            "url": ""
          }
        }

        let postUrl = new URL(link.url);
        let postId = postUrl.pathname.split("/").slice(-1);

        let f = fetch(`${postUrl.origin}/api/v1/statuses/${postId}`)
          .then(response => response.json())
          .then(postJson => {
            syn.created = postJson.created_at.split('T')[0];
            syn.topic = postJson.content.match(/(?<=&#39;|').*?(?=&#39;|')/)?.[0] ?? null;
            syn.replyto.id = postJson.in_reply_to_id;
            if (!syn.topic) throw new Error("Topic could not be extracted for " + syn.key);
            // console.log(">> 1 > " + syn.key + " | " + JSON.stringify(syn));
          })
          .then(() => fetch(`${postUrl.origin}/api/v1/statuses/${syn.replyto.id}`))
          .then(response => response.json())
          .then(replytoJson => {
            syn.replyto.url = replytoJson.url;
            // console.log(">> 2 > " + syn.key + " | " + JSON.stringify(syn));
          })
          .then(() => fetch(deeplAPI, {
            method: "POST",
            headers: {
              "Authorization": `DeepL-Auth-Key ${deeplKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              text: [`${syn.topic}`],
              target_lang: "EN"
            })
          }))
          .then(response => response.json())
          .then((deeplJson) => {
            let topicEn = deeplJson.translations[0].text;
            if (topicEn) {
              syn.topic_en = topicEn;
            }
            // console.log(">> 3 > " + syn.key + " | " + JSON.stringify(syn));
          })
          .then(() => {
            _synJson.syndications.push(syn);
            //console.log(">> 4 > " + JSON.stringify(syn));
          })
          .catch(error => {
            console.log(error);
            return;
          });
          
          fetches.push(f);
      }

    });

    Promise.all(fetches)
      .then(() => {
        // console.log("===========================================================");
        // console.log(JSON.stringify(_synJson));
        if (newSyn > 0) {
          _synJson.syndications.sort((a,b) => Date.parse(b.created) - Date.parse(a.created));
          fs.writeFileSync(_synFile, JSON.stringify(_synJson));
        }
        console.log("FOTOVORSCHLAG: +" + newSyn);
      });
  }

}
module.exports.SynCollector_Fotovorschlag = SynCollector_Fotovorschlag;