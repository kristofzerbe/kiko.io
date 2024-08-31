/**
 * Sample for a Mentions United Renderer plugin for displaying Interactions in your way
 * 
 * @author <YOUR-NAME>
 * @version 1.0.0
 * @see {@link https://github.com/kristofzerbe/MentionsUnited|GitHub}
 * It would be wonderful of you open up a PR here to let me add your plugin to the project
 * 
* Options:
 *  - placeholderId {String}  = for example an ID of the element which will be replaced
 * 
 */
class MentionsUnitedRenderer_NAME extends MentionsUnited.Renderer {
  name = "<RENDERER>";

  options = { 
    placeholderId: ""
  }

  constructor(options) {
    super();
    this.options = {...this.options, ...options};
    this.helper = new MentionsUnited.Helper();
  }

  /**
   * Renders the element regarding Interactions
   * @param {Array} interactions 
   */
  render(interactions) {

    //set and check placeholder where the anchor element should be inserted
    let placeholder = document.getElementById(this.options.placeholderId);
    if (!placeholder) { throw "No placeholder defined to replace with interactions"; }
    
    const templates = new this.#Templates(this.helper);

    //... do something with the interactions, for example:
    let result = this.helper.createElementFromHtml("<div></div>");
    for (let ia of interactions) {
      //call your template method to get the HTML and convert to element
      let html = templates.MY_TEMPLATE_FUNCTION(ia);
      let element = this.helper.createElementFromHtml(html);
      result.appendChild(element);
    }

    //replace placeholder with result element
    placeholder.replaceWith(result);
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
     * Composes an Interaction element ... fo example 'like from John Doe'
     * @param {Interaction} ia
     * @returns {String}
     */
    MY_TEMPLATE_FUNCTION(ia) {
      return this.helper.fillLiteralTemplate(
        `
        <span>${ia.type} from ${ia.author.name}</span>
        `,
        ia
      );
    }

  }

}