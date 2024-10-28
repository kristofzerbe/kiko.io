/**
 * Sample for a Mentions United Provider plugin class for retreiving interactions from Lemmy
 * 
 * @author Kristof Zerbe
 * @version 1.0.0
 * @see {@link https://github.com/kristofzerbe/MentionsUnited|GitHub} 
 * It would be wonderful of you open up a PR here to let me add your plugin to the project
 * 
 * API Documentation: https://github.com/MV-GH/lemmy_openapi_spec
 *                    https://lemmy.readme.io/reference
 * 
 * Options:
 *  - {String} sourceUrl = for example an URL of the mentioning page on __ORIGIN__
 * 
 * Supported origins:
 *  - lemmy
 * 
 * Supported type-verbs:
 *  - comment
 * 
 * Remarks:
 *  - 
 */
class MentionsUnited_Lemmy extends MentionsUnited.Provider {
  key = "__PROVIDER__"; // must be unique across all provider plugins for registration
  
  options = {
    sourceUrl: ""
  }

  constructor(options) {
    super();
    this.options = {...this.options, ...options};
    this.helper = new MentionsUnited.Helper(); // if needed

    //check mandatory options
    if (this.options.sourceUrl.length === 0) { throw "'sourceUrl' is missing"; }
  }

  /**
   * Retrieve data from Lemmy
   * @returns {Array.<MentionsUnited.Interaction>}
   * 
   * Remarks:
   *  - be sure to set 'provider' to 'this.key' in every new instance of MentionsUnited.Interaction
   */
  async retrieve() {
    const msg = `${this.constructor.name}: Retreiving interactions for '${this.options.sourceUrl}'`;
    console.time(msg);
    
    const apiResponse = await fetch("__URL__");
    const apiData = await apiResponse.json();
    let interactions = this.#processJsonData(apiData);
    
    console.timeEnd(msg);
    return interactions;

  }

  //////////////////////////////////////////////////////////////////////////////////////////
  
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

    // r.type = entry...;
    // r.received = entry...;

    r.source.provider = this.key;
    r.source.origin = "lemmy";
    r.source.sender = this.key;
    // r.source.url = entry...;
    // r.source.id = entry...;
    // r.source.title = entry...

    // r.author.name = entry...;
    // r.author.avatar = entry...;
    // r.author.profile = entry...;

    // r.content.text = entry...;
    // r.content.html = entry...;
    
    return r;
  }

}
/**
 * Changelog
 * 
 * 1.0.0  - Initial
 */