/**
 * Mentions United Provider plugin for retreiving interactions from Pixelfed
 * 
 * @author Kristof Zerbe
 * @version 1.0.0
 * @see {@link https://github.com/kristofzerbe/MentionsUnited|GitHub}
 * 
 * API Documentation: There is no proper API documentation, but the source code is freely available at: 
 *                    https://github.com/pixelfed/pixelfed/blob/dev/app/Http/Controllers/Api/ApiV1Controller.php
 * 
 * Options:
 *  - sourceUrl {String}        = URL of the mentioning page on Pixelfed - MANDATORY
 *  - apiTokenReadOnly {String} = Your token to access Pixelfed's API in Read-Only mode
 * 
 * Remarks:
 *  - This implementation relies either on a READ-ONLY token of your Pixelfed instance, 
 *    then you have to set the option 'apiUrl' in the calling code to the base URL of 
 *    your instance, or you use an API PROXY which forwards the requests to the 
 *    Pixelfed API according to the same URL scheme. In this case the URL of your  
 *    proxy has to be set to 'apiUrl' and you can leave 'apiTokenReadOnly' blank.
 * 
 *    IMPORTANT: The API Token approach means, that your token is visible in your 
 *    JavaScript code and is therefore PUBLICLY AVAILABLE and could be used by ANYONE! 
 *    You can search for ‘tokenCan(’read‘)’ in the Pixelfed source code to see what 
 *    information you are making freely available with it.
 
 *    However, both variants require the token, that you can generate your token at: 
 *    https://<INSTANCE>/settings/applications.
 * 
*/
class MentionsUnitedProvider_Pixelfed  extends MentionsUnited.Provider {
  name = "pixelfed.social";
  
  options = { 
    sourceUrl: "",
    apiUrl: "",
    apiTokenReadOnly: ""
  }

  statusApiUrl() { return `${this.options.apiUrl}/api/v1/statuses/${this.sourceId}` };
  contextApiUrl() { return `${this.options.apiUrl}/api/v1/statuses/${this.sourceId}/context` };
  favoritedApiUrl() { return `${this.options.apiUrl}/api/v1/statuses/${this.sourceId}/favourited_by`; }
  rebloggedApiUrl() { return `${this.options.apiUrl}/api/v1/statuses/${this.sourceId}/reblogged_by`; }
  
  constructor(options) {
    super();
    this.options = {...this.options, ...options};

    //check mandatory fields
    if (this.options.sourceUrl.length === 0) { throw "'sourceUrl' is missing"; }

    //get the id of the post from last element of the source URL
    this.sourceId = new URL(this.options.sourceUrl).pathname.split("/").pop();
  }

  /**
   * Retrieve data from Pixelfed and return an array of MentionsUnited.Interaction
   * @returns {Array}
   */
  async retrieve() {
    const msg = `${this.constructor.name}: Retreiving interactions for '${this.options.sourceUrl}'`;
    console.time(msg);
    
    // 1 - Reposts
    let interactionsReblogged = [];
    try {
      const apiResponseReblogged = await fetch(this.rebloggedApiUrl(), {
        headers: { Authorization: `Bearer ${this.options.apiTokenReadOnly}` }
      });
      const apiDataReblogged = await apiResponseReblogged.json();
      interactionsReblogged = this.#processJsonData(apiDataReblogged ?? [], "repost");        
    } catch (e) { console.error(e); }

    // 2 - Likes
    let interactionsFavorited = [];
    try {
      const apiResponseFavorited = await fetch(this.favoritedApiUrl(), {
        headers: { Authorization: `Bearer ${this.options.apiTokenReadOnly}` }
      });
      const apiDataFavorited = await apiResponseFavorited.json();
      interactionsFavorited = this.#processJsonData(apiDataFavorited ?? [], "like");        
    } catch (e) { console.error(e); }

    // 3 - Replies
    let interactionsContext = [];
    try {
      const apiResponseContext = await fetch(this.contextApiUrl(), {
        headers: { Authorization: `Bearer ${this.options.apiTokenReadOnly}` }
      });
      const apiDataContext = await apiResponseContext.json();
      interactionsContext = this.#processJsonData(apiDataContext.descendants ?? [], "reply");        
    } catch (e) { console.error(e); }

    console.timeEnd(msg);
    return [...interactionsReblogged, ...interactionsFavorited, ... interactionsContext];
  }

  //////////////////////////////////////////////////////////////////////////////////////////
  
    /**
     * Processes retrieved JSON data into flat array of Interactions 
     * @param {Array} entries 
     * @param {String} type 
     * @returns {Array}
     */
    #processJsonData(entries, type) {
      return entries.map((item) => {
        return this.#convertToInteraction(item, type);
      });
    }
  
    /**
     * Converts specific data object into Interaction
     * @param {Object} entry 
     * @returns {MentionsUnited.Interaction}
     */
    #convertToInteraction(entry, type) {
      let r = new MentionsUnited.Interaction();
  
      r.source.provider = this.name;
      r.source.origin = "pixelfed";
      r.source.sender = this.name;
      r.source.url = this.options.sourceUrl;
      r.source.id = entry.id;

      r.author.name = (type === "reply") ? entry.account.display_name : entry.display_name;
      r.author.avatar = (type === "reply") ? entry.account.avatar : entry.avatar;
      r.author.profile = (type === "reply") ? entry.account.url : entry.url;

      r.type = type;
      r.received = (type === "reply") ? entry.created_at : undefined;
      r.content.text = entry.content;
      
      return r;
    }
  
}
