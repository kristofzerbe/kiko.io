/**
 * Mentions United Provider plugin class for retreiving interactions from Vernissage
 * 
 * @author Kristof Zerbe
 * @version 1.0.0
 * @see {@link https://github.com/kristofzerbe/MentionsUnited|GitHub} 
 * 
 * API Documentation: 
 * 
 * Options:
 *  - {String} syndicationUrl     = Full URL of the Vernissage post
 *  - {String} [syndicationTitle] = Title of the Vernissage post, if multiple syndications of original post
 * 
 * Supported origins:
 *  - vernissage
 * 
 * Supported type-verbs:
 *  - like
 *  - repost
 *  - comment
 * 
 * Remarks:
 *  - 
 */
class MentionsUnitedProvider_Vernissage extends MentionsUnited.Provider {
  key = ""; // will be set via syndicationUrl in constructor (must be unique across all provider plugins for registration)
  
  options = {
    syndicationUrl: "",
    syndicationTitle: ""
  }

  constructor(options) {
    super();
    this.options = {...this.options, ...options};
    this.helper = new MentionsUnited.Helper(); // if needed

    //check mandatory options
    if (this.options.syndicationUrl.length === 0) { throw "'syndicationUrl' is missing"; }

    //get needed information from syndicationUrl
    let vernissageUrl = new URL(this.options.syndicationUrl);
    this.key = vernissageUrl.hostname;
    this.sourceId = vernissageUrl.pathname.split("/").pop();

    //set API endpoint
    this.options.apiBaseUrl = vernissageUrl.origin;
  }

  /**
   * Retrieve data from Vernissage
   * @returns {Array.<MentionsUnited.Interaction>}
   */
  async retrieve(args) {
    const msg = `${this.constructor.name}: Retreiving interactions for '${this.options.syndicationUrl}'`;
    args.fStart(msg);

    // 1 - Reposts
    let interactionsReblogged = [];
    try {
      const apiResponseReblogged = await fetch(this.rebloggedApiUrl());
      const apiDataReblogged = await apiResponseReblogged.json();
      interactionsReblogged = this.#processJsonData(apiDataReblogged.data ?? [], "repost");        
    } catch (e) { console.error(e); }

    // 2 - Likes
    let interactionsFavorited = [];
    try {
      const apiResponseFavorited = await fetch(this.favoritedApiUrl());
      const apiDataFavorited = await apiResponseFavorited.json();
      interactionsFavorited = this.#processJsonData(apiDataFavorited.data ?? [], "like");        
    } catch (e) { console.error(e); }
    
    // 3 - Comments
    let interactionsContext = [];
    try {
      const apiResponseContext = await fetch(this.contextApiUrl());
      const apiDataContext = await apiResponseContext.json();
      interactionsContext = this.#processJsonData(apiDataContext.descendants ?? [], "comment");        
    } catch (e) { console.error(e); }

    args.fEnd(msg);
    return [...interactionsReblogged, ...interactionsFavorited, ... interactionsContext];
  }

  //////////////////////////////////////////////////////////////////////////////////////////
  
  contextApiUrl() { return `${this.options.apiBaseUrl}/api/v1/statuses/${this.sourceId}/context` };
  favoritedApiUrl() { return `${this.options.apiBaseUrl}/api/v1/statuses/${this.sourceId}/favourited`; }
  rebloggedApiUrl() { return `${this.options.apiBaseUrl}/api/v1/statuses/${this.sourceId}/reblogged`; }

  /**
   * Processes retrieved JSON data into flat array of Interaction 
   * @param {Array.<Object>} entries 
   * @param {String} type
   * @returns {Array.<MentionsUnited.Interaction>}
   */
  #processJsonData(entries, type) {
    return entries.map((item) => {
      return this.#convertToInteraction(item, type);
    });
  }
  
  /**
   * Converts specific data object into Interaction
   * @param {Object} entry
   * @param {String} type 
   * @returns {MentionsUnited.Interaction}
   */
  #convertToInteraction(entry, type) {
    let r = new MentionsUnited.Interaction();

    r.syndication.url = this.options.syndicationUrl;
    r.syndication.title = this.options.syndicationTitle;

    r.type = type;
    r.received = entry.createdAt;

    r.source.provider = this.key;
    r.source.origin = "vernissage";
    r.source.sender = this.key;
    r.source.url = this.options.syndicationUrl;
    r.source.id = entry.id;
    r.source.title = "";

    r.author.name = (type === "comment") ? entry.user.name : entry.name;
    r.author.avatar = (type === "comment") ? entry.user.avatarUrl : entry.avatarUrl;
    r.author.profile = (type === "comment") ? entry.user.activityPubProfile : entry.activityPubProfile;

    r.content.html = entry.noteHtml;
    
    return r;
  }

}
/**
 * Changelog
 * 
 * 1.0.0  - Initial
 */