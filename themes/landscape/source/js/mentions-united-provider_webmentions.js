/**
 * Mentions United Provider plugin for retreiving webmentions from webmention.io
 * 
 * API Documentation: https://github.com/aaronpk/webmention.io
 * 
 * Options:
 *  - targetUrl {String}         = URL of the page mentioned - MANDATORY
 *  - tryResolveTitle {Boolean}  = Should titles of web pages be resolved
 * 
 */
class MentionsUnitedProvider_Webmentions extends MentionsUnited.Provider {
  name = "webmention.io";
  
  options = { 
    targetUrl: "",
    tryResolveTitle: false
  }

  constructor(options) {
    super();
    this.options = {...this.options, ...options};
    this.helper = new MentionsUnited.Helper();

    //check mandatory fields
    if (this.options.targetUrl.length === 0) { throw "'targetUrl' is missing"; }
  }

  webmentionApiUrl() { return `https://webmention.io/api/mentions.jf2?target=${encodeURIComponent(this.options.targetUrl)}&per-page=1000&sort-dir=up`; };

  /**
   * Retrieve data from webmention.io and return an array of MentionsUnited.Interaction
   * @returns {Array}
   */
  async retrieve() {
    const msg = `${this.constructor.name}: Retreiving webmentions for '${this.options.targetUrl}'`;
    console.time(msg);

    const apiResponse = await fetch(this.webmentionApiUrl());
    const apiData = await apiResponse.json();

    let interactions = this.#processJsonData(apiData.children);

    //Interaction adjustments depending on type ...
    for (let r of interactions) {

      //Resolve emojis in Mastodon author names
      if (r.source.origin === "mastodon") { this.#resolveCustomEmojis(r); }

      //Resolve page title for webmentions from web pages, if wanted
      if (r.source.origin === "web" && this.options.tryResolveTitle) { 
        await this.#resolvePageTitle(r); 
      }
    };

    console.timeEnd(msg);
    return interactions;
  }

  #emojiBuffer = {};
  /**
   * Resolves custom emojis in author names via the respective Mastodon instance with image URL 
   * @param {MentionsUnited.Interaction} interaction 
   * 
   * Remarks:
   *  - Emoji data are fetched asynchronously and the result is buffered 
   *    to avoid identical subsequent requests
   *  - Found emojis are stored for later for composing the author HTML
   */
  async #resolveCustomEmojis(interaction) {

    const regexp = /:(?<shortcode>[a-z]\w+):/g;
    const matches = [...interaction.author.name.matchAll(regexp)];

    if (matches.length > 0) {
      let result = [];

      let instance = new URL(interaction.author.profile).hostname;
      let emojiApiUrl = `https://${instance}/api/v1/custom_emojis`;

      let emojiData;
      if(instance in this.#emojiBuffer) {
        emojiData = this.#emojiBuffer[instance]; //get api data from buffer
      } else {
        emojiData = this.helper.fetchJsonSync(emojiApiUrl); //fetch emoji data from instance    
        this.#emojiBuffer[instance] = emojiData; //... and store in buffer
      }

      for (const m of matches) {
        let emojiCode = m.groups.shortcode;
        let emoji = emojiData.filter((e) => e.shortcode === emojiCode)[0];
        if (emoji) {
          result.push({
            code: emojiCode,
            url: emoji.url
          });
        }
      };

      interaction.author.emojis = result;
    }
  }

  /**
   * Resolves the title of the web page which mentions
   * @param {MentionsUnited.Interaction} interaction 
   */
  async #resolvePageTitle(interaction) {

    if (interaction.source.url) {
      let title = "a post";

      try {
        const pageData = await fetch(interaction.source.url, {
          signal: AbortSignal.timeout(3000)
        }).then(response => response.text());
        
        if (pageData) {
          let regexp = /<title>(?<title>(.*?))<\/title>/g;
          let titleMatches = regexp.exec(pageData);
          if (titleMatches.groups.title) {
            title = titleMatches.groups.title;
          }
        }
      } catch (error) { console.error(error); }
      
      interaction.source.title = title;
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Processes retrieved JSON data into flat array of Interactions 
     * @param {Array} entries
     * @returns {Array}
     */
    #processJsonData(entries) {
      return entries.map((item) => {
        return this.#convertToInteraction(item);
      });
    }
  
    /**
     * Converts specific data object into Interaction
     * @param {Object} entry 
     * @returns {MentionsUnited.Interaction}
     */
    #convertToInteraction(entry) {
      let r = new MentionsUnited.Interaction();

      const sourceUrl = new URL(entry["wm-source"]);

      r.source.provider = this.name;
      r.source.origin = "web";
      r.source.sender = sourceUrl.hostname;
      r.source.url = sourceUrl.href;
      r.source.id = entry["wm-id"];

      r.author.name = entry.author?.name || "Somebody";
      r.author.avatar = entry.author.photo;
      r.author.profile = entry.author.url;

      r.type = this.#translatePropertyVerb(entry["wm-property"]);
      r.received = entry["published"] ?? entry["wm-received"];
      r.content.html = entry.content?.html;
      r.content.text = entry.content?.text;

      // replace defaults, if it comes from bridgy
      if (r.source.sender === "brid.gy") {
        const bridgyPath = sourceUrl.pathname.split("/");
        r.source.origin = bridgyPath[2]; //mastodon, flickr, github, reddit, bluesky, etc
      }

      return r;
    }

    /**
     * Translates an IndieWeb property verb into a normal one
     * @param {String} wmProperty 
     * @returns 
     */
    #translatePropertyVerb(wmProperty) {
      switch (wmProperty) {
        case "in-reply-to": return "reply";  
        case "like-of": return "like";  
        case "repost-of": return "repost";  
        case "bookmark-of": return "bookmark";  
        case "mention-of": return "mention";  
        default: return wmProperty;
      }
    }
  
}
