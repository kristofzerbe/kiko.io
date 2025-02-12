/**
 * Sample for a Mentions United Provider plugin class for retreiving interactions from __PROVIDER__
 * 
 * @author __YOUR-NAME__
 * @version 1.0.0
 * @see {@link https://github.com/kristofzerbe/MentionsUnited|GitHub} 
 * It would be wonderful of you open up a PR here to let me add your plugin to the project
 * 
 * API Documentation: __URL__
 * 
 * Options:
 *  - {String} syndicationUrl     = Full URL of the __PROVIDER__ post
 *  - {String} [syndicationTitle] = Title of the __PROVIDER__ post, if multiple syndications of original post
 * 
 * Supported origins:
 *  - __ORIGIN__
 * 
 * Supported type-verbs:
 *  - __SUPPORTED-TYPE-VERB__
 * 
 * Remarks on customizing:
 *  - the fields 'key', 'options' and the async method 'retrieve' are mandatory
 *  - 'options' should be defined as used afterwards during initialisation of the calling code
 */
class MentionsUnitedProvider_NAME extends MentionsUnited.Provider {
  key = "__PROVIDER__"; // must be unique across all provider plugins for registration
  
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
  }

  /**
   * Retrieve data from __ORIGIN__
   * @returns {Array.<MentionsUnited.Interaction>}
   * 
   * Remarks:
   *  - be sure to set 'provider' to 'this.key' in every new instance of MentionsUnited.Interaction
   */
  async retrieve(args) {
    const msg = `${this.constructor.name}: Retreiving interactions for '${this.options.syndicationUrl}'`;
    args.fStart(msg);
    
    const apiResponse = await fetch("__URL__");
    const apiData = await apiResponse.json();
    let interactions = this.#processJsonData(apiData);

    args.fCount();
    
    args.fEnd(msg);
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

    r.syndication.url = this.options.syndicationUrl;
    r.syndication.title = this.options.syndicationTitle;

    // r.type = entry...;
    // r.received = entry...;

    r.source.provider = this.key;
    r.source.origin = "__TYPE-OF-SYSTEM__";
    r.source.sender = this.key;
    // r.source.url = entry...;
    // r.source.id = entry...;
    // r.source.title = entry...;

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
 * 1.0.0 - Initial
 */