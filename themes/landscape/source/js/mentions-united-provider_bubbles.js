/**
 * Sample for a Mentions United Provider plugin class for retreiving interactions from __PROVIDER__
 * 
 * @author Kristof Zerbe
 * @version 1.0.0
 * @see {@link https://github.com/kristofzerbe/MentionsUnited|GitHub} 
 * 
 * API Documentation: https://bubbles.town/api + https://docs.gotosocial.org/en/latest/
 * 
 * Options:
 *  - {String} syndicationUrl = Full URL of the syndicated post on Bubbles
 * 
 * Supported origins:
 *  - bubbles
 * 
 * Supported type-verbs:
 *  - like
 *  - TODO: ...
 * 
 * Remarks:
 *  - bubbles.town holds the votes (LIKES) for a post and social.bubbles.town all other interactions
 */
class MentionsUnitedProvider_Bubbles extends MentionsUnited.Provider {
  key = "Bubbles"; // must be unique across all provider plugins for registration
  
  options = {
    syndicationUrl: ""
  }

  constructor(options) {
    super();
    this.options = {...this.options, ...options};
    this.helper = new MentionsUnited.Helper(); // if needed

    //check mandatory options
    if (this.options.syndicationUrl.length === 0) { throw "'syndicationUrl' is missing"; }

    //get needed information from syndicationUrl
    let bubblesUrl = new URL(this.options.syndicationUrl);
    this.sourceId = bubblesUrl.pathname.split("/").pop();
  }

  /**
   * Retrieve data from Bubbles in two steps
   * @returns {Array.<MentionsUnited.Interaction>}
   * 
   * Remarks:
   *  - Step 1: Get interactions (votes) and "fediverse_url" fom bubbles.town
   *  - Step 2: Get interactions from social.bubbles.town (GoToSocail)
   */
  async retrieve(args) {
    const msg = `${this.constructor.name}: Retreiving interactions for '${this.options.syndicationUrl}'`;
    args.fStart(msg);
    
    // Step 1
    const apiResponseBubbles = await fetch(this.bubblesApiUrl());
    const apiDataBubbles = await apiResponseBubbles.json();
    let votesCount = apiDataBubbles.votes ?? 0;
    const entryDataBubbles = Array(votesCount).fill(0).map(e => ({ 
      type: "like", 
      url: this.options.syndicationUrl,
      id: this.sourceId,
      author: "Anonymous",
      avatar: `https://api.dicebear.com/9.x/glass/svg?seed=${this.#getseed(5)}&&backgroundColor=3a8a7f&size=128&scale=75`
    }));
    let interactionsBubbles = this.#processJsonData(entryDataBubbles);

    // Step 2
    //TODO
    let interactionsSocial = [];

    args.fCount();
    
    args.fEnd(msg);
    return [...interactionsBubbles, ...interactionsSocial];

  }

  //////////////////////////////////////////////////////////////////////////////////////////
  
  bubblesApiUrl() { return `https://bubbles.town/api/entry/${this.sourceId}`; };

  /**
   * Processes retrieved JSON data into flat array of Interaction 
   * @param {Array.<Object>} entries 
   * @returns {Array.<MentionsUnited.Interaction>}
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

    r.syndication.url = this.options.syndicationUrl;

    r.type = entry.type;
    // r.received = entry...

    r.source.provider = this.key;
    r.source.origin = "bubbles";
    r.source.sender = this.key;
    r.source.url = entry.url;
    r.source.id = entry.id;
    r.source.title = "";

    r.author.name = entry.author;
    r.author.avatar = entry.avatar;
    r.author.profile = entry.url;

    // r.content.text = entry...;
    // r.content.html = entry...;
    
    return r;
  }

  /**
   * Get random character string for seeding
   * @param {number} length 
   * @returns 
   */
  #getseed(length) {
    var result = "";
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
/**
 * Changelog
 * 
 * 1.0.0 - Initial
 */