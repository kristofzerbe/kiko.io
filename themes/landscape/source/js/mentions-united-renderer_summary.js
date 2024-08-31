/**
 * Mentions United Renderer plugin for displaying a total number of Interactions
 * as an anchor to jump to interaction list f.e.
 * 
 * Options:
 *  - placeholderId {String}  = ID of the element which will be replaced
 *  - jumpToId {String}       = ID of the element to jump to on click
 *  - pageKey {String}        = Unique identifier of the page, e.g. slug
 *  - afterInsert {Function}  = JS function to call after insert
 */
class MentionsUnitedRenderer_TotalNumber extends MentionsUnited.Renderer {
  name = "totalnumber";

  options = { 
    placeholderId: "",
    jumpToId: "",
    pageKey: "",
    afterInsert: undefined
  }

  constructor(options) {
    super();
    this.options = {...this.options, ...options};
    this.helper = new MentionsUnited.Helper();
  }

  /**
   * Renders the total number anchor
   * @param {Array} interactions 
   */
  render(interactions) {

    //check interaction count from last visit and calculate delta
    const storeKey = "ia-" + this.options.pageKey;
    let lastVisit = 0;
    let delta = 0;
    if (localStorage.getItem(storeKey)) {
      lastVisit = localStorage.getItem(storeKey);
    } else {
      lastVisit = interactions.length; //for first visit
    }
    if (interactions.length > lastVisit) {
      delta = (interactions.length - lastVisit);
    }
    localStorage.setItem(storeKey, interactions.length);
    
    //nothing to show here -> exit
    if (interactions.length === 0) { return; } 

    //set and check placeholder where the anchor element should be inserted
    let placeholder = document.getElementById(this.options.placeholderId);
    if (!placeholder) { throw "No placeholder defined to insert the total number anchor"; }

    const templates = new this.#Templates(this.helper);

    //define data object for template
    let data = {
      count: interactions.length,
      delta: delta,
      jumpToId: this.options.jumpToId
    }

    //get template HTML and convert to element
    let html = templates.totalnumber(data);
    let element = this.helper.createElementFromHtml(html);

    //replace placeholder with element
    placeholder.replaceWith(element);

    //call afterInsert callback, if defined
    if (typeof this.options.afterInsert === "function") {
      this.options.afterInsert();
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Template class to hold methods for composing the HTML
   */
  #Templates = class Templates {

    constructor(helper) {
      this.helper = helper;
    }

    /**
     * Composes a total number of Interaction anchor
     * @param {Object} stats
     * @returns {String}
     */
    totalnumber(data) {
      return this.helper.fillLiteralTemplate(
        `
        <a href="#${data.jumpToId}" class="interactions-totalnumber">
          <span>${data.count} Interaction${(data.count) === 1 ? "" : "s"}</span>
          ${(data.delta > 0) ? this.#part_delta(data) : "" }
        </a>
        `,
        data
      );
    }

    /**
     * Template part for the delta of last visit
     * @param {Object} data 
     */
    #part_delta(data) {
      return this.helper.fillLiteralTemplate(
        `
        <span class="delta">+ ${data.delta}</span>
        `,
        data
      );  
    }

  }

}