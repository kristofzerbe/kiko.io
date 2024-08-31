/**
 * Sample for a Mentions United Provider plugin for retreiving interactions from <ORIGIN>
 * 
 * @author <YOUR-NAME>
 * @version 1.0.0
 * @see {@link https://github.com/kristofzerbe/MentionsUnited|GitHub} 
 * It would be wonderful of you open up a PR here to let me add your plugin to the project
 * 
 * API Documentation: <URL>
 * 
 * Options:
 *  - sourceUrl {String} = for example an URL of the mentioning page on <ORIGIN>
 * 
 * Remarks on customizing:
 *  - the fields 'name', 'options' and the async method 'retrieve' are mandatory
 *  - 'options' should be defined as used afterwards during initialisation of the calling code
 */
class MentionsUnited_NAME extends MentionsUnited.Provider {
  name = "<PROVIDER>";
  
  options = { 
    sourceUrl: ""
  }

  constructor(options) {
    super();
    this.options = {...this.options, ...options};
    this.helper = new MentionsUnited.Helper(); // if needed

  }

  /**
   * Retrieve data from origin and return an array of MentionsUnited.Interaction
   * @returns {Array}
   * 
   * Remarks:
   *  - be sure to set 'provider' to 'this.name' in every new instance of MentionsUnited.Interaction
   */
  async retrieve() {
    const msg = `${this.constructor.name}: Retreiving interactions for '${this.options.sourceUrl}'`;
    console.time(msg);
    
    const apiResponse = await fetch("<URL>");
    const apiData = await apiResponse.json();
    let interactions = this.#processJsonData(apiData);
    
    console.timeEnd(msg);
    return interactions;

  }

  //////////////////////////////////////////////////////////////////////////////////////////
  
    /**
     * Processes retrieved JSON data into flat array of Interaction 
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
  
      r.source.provider = this.name;
      r.source.origin = "<TYPE-OF-SYSTEM>";
      r.source.sender = this.name;
      // r.source.url = entry...;
      // r.source.id = entry...;
      // r.source.title = entry...

      // r.author.name = entry...;
      // r.author.avatar = entry...;
      // r.author.profile = entry...;

      // r.type = entry...;
      // r.received = entry...;
      // r.content.text = entry...;
      // r.content.html = entry...;
      
      return r;
    }

}
