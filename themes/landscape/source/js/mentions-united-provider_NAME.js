/**
 * Mentions United Provider plugin for retreiving interactions from <ORIGIN>
 * 
 * API Documentation: <URL>
 * 
 * Options:
 *  - sourceUrl {String} = URL of the mentioning page on <ORIGIN>
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
   *  - be sure to set 'origin' to 'this.origin' in every instance of MentionsUnited.Interaction
   */
  async retrieve() {
    const msg = `${this.constructor.name}: Retreiving interactions for '${this.options.sourceUrl}'`;
    console.time(msg);
    
    // Example for fetching and processing data
    // ----------------------------------------
    // const apiResponse = await fetch("<URL>");
    // const apiData = await apiResponse.json();
    // let interactions = this.#processJsonData(apiData);
    // console.timeEnd(msg);
    // return interactions;

    //(just a placeholder for testing)
    return new Promise((resolve)  => {
      resolve([]);
    });

  }

  //////////////////////////////////////////////////////////////////////////////////////////
  
    // Use these private methods to process the retrieved api data or write you own

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
  
      r.source.provider = this.provider;
      // r.source.origin = ...;
      // r.source.sender = ...;
      // r.source.url = ...;
      // r.source.id = ...;
      // r.source.title = ...

      // r.author.name = ...;
      // r.author.avatar = ...;
      // r.author.profile = ...;

      // r.type = ...;
      // r.received = ...;
      // r.content.text = ...;
      // r.content.html = ...;
      
      return r;
    }

}
