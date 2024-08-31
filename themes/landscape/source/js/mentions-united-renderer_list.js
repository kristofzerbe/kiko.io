/**
 * Mentions United Renderer plugin for displaying Interactions as a list
 * 
 * @author Kristof Zerbe
 * @version 1.0.0
 * @see {@link https://github.com/kristofzerbe/MentionsUnited|GitHub}
 * 
 * Options:
 *  - containerId {String} = ID of the HTML element into which the interactions are to be inserted
 * 
 */
class MentionsUnitedRenderer_List extends MentionsUnited.Renderer {
  name = "list";

  options = { 
    containerId: ""
  }

  constructor(options) {
    super();
    this.options = {...this.options, ...options};
    this.helper = new MentionsUnited.Helper();
  }

  /**
   * Renders Interactions
   * @param {Array} interactions 
   */
  render(interactions) {

    //set and check container where Interaction elements should be inserted
    let container = document.getElementById(this.options.containerId);
    if (!container) { throw "No container defined to insert all the interactions"; }

    const templates = new this.#Templates(this.helper);

    let iaElements = [];

    for (let ia of interactions) {
      try {
        //get template HTML and convert to element
        let html = (typeof templates[ia.type] === 'function') 
          ? templates[ia.type](ia)
          : templates["unknown"](ia);
        
        let element = this.helper.createElementFromHtml(html);
        iaElements.push(element); 

      } catch (error) { console.error(error); }
    }

    if (iaElements.length > 0) {
      //replace container content with Interaction elements
      container.replaceChildren(...iaElements);
    } else {
      //replace container content with n/a message
      container.innerHTML = "No interaction yet";
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
     * Composes an unknown type, whose template method does not yet exist
     * @param {Interaction} ia 
     * @returns {HTML}
     */
    unknown(ia) {
      ia.typeVerb = "? (" + ia.type + ")";

      let parts = {};
      parts.received = (ia.received) 
        ? this.#part_received(ia) 
        : "";
      parts.source = this.#part_origin(ia);
      parts.content = (ia.content.text) 
        ? this.#part_content_text_excerpt(ia) 
        : "";
      
      return this.#base(ia, parts);
    }
    
    /**
     * Composes a LIKE
     * @param {Interaction} ia 
     * @returns {HTML}
     */
    like(ia) {
      ia.typeVerb = "liked";

      let parts = {};
      parts.received = (ia.received) 
        ? this.#part_received(ia) 
        : "";
      
      return this.#base(ia, parts);
    }

    /**
     * Composes a REPLY
     * @param {Interaction} ia 
     * @returns {HTML}
     */
    reply(ia) {
      ia.typeVerb = "replied";
      
      let parts = {};
      parts.received = this.#part_received(ia);
      parts.source = (ia.source.origin === "web") 
        ? this.#part_origin_title(ia) 
        : this.#part_origin(ia);
      parts.content = (ia.content.html) 
        ? this.#part_content_html(ia) 
        : this.#part_content_text(ia);

      return this.#base(ia, parts);
    }
    
    /**
     * Composes a COMMENT (same as REPLY)
     * @param {Interaction} ia 
     * @returns {HTML}
     */
    comment(ia) {
      ia.typeVerb = "commented";

      let parts = {};
      parts.received = this.#part_received(ia);
      parts.source = (ia.source.origin === "web") 
        ? this.#part_origin_title(ia) 
        : this.#part_origin(ia);
      parts.content = (ia.content.html) 
        ? this.#part_content_html(ia) 
        : this.#part_content_text(ia);

      return this.#base(ia, parts);
    }

    /**
     * Composes a MENTION
     * @param {Interaction} ia 
     * @returns {HTML}
     */
    mention(ia) {
      ia.typeVerb = "mentioned";

      let parts = {};
      parts.received = this.#part_received(ia);
      parts.source = (ia.source.origin === "web") 
        ? this.#part_origin_title(ia) 
        : this.#part_origin(ia);
      parts.content = (ia.content.text) 
        ? this.#part_content_text_excerpt(ia) 
        : "";

      return this.#base(ia, parts);
    }
    
    /**
     * Composes a REPOST
     * @param {Interaction} ia 
     * @returns {HTML}
     */
    repost(ia) {
      ia.typeVerb = "reposted";

      let parts = {};
      parts.received = this.#part_received(ia);
      parts.source = (ia.source.origin === "web") 
        ? this.#part_origin_title(ia) 
        : this.#part_origin(ia);

      return this.#base(ia, parts);
    }
    
    /**
     * Composes a BOOKMARK
     * @param {Interaction} ia 
     * @returns {HTML}
     */
    bookmark(ia) {
      ia.typeVerb = "bookmarked";

      let parts = {};
      parts.received = (ia.received) 
        ? this.#part_received(ia) 
        : "";
      
      return this.#base(ia, parts);
    }

    /**
     * Base template for Interaction
     * @param {Interaction} ia
     * @param {HTML} parts 
     * @returns {String}
     */
    #base(ia, parts) {
      return this.helper.fillLiteralTemplate(
        `
        <div class="interaction origin-${ia.source.origin} type-${ia.type} ${(ia.isOwn) ? "isown" : ""}">
          <a class="avatar" href="${ia.author.profile ?? ""}">
            <img src="${ia.author.avatar}" alt="${ia.author.name}" width="16px" height="16px" />
          </a>
          <span class="meta">
            ${this.#part_author(ia)}
            <span class="type">${ia.typeVerb}</span>
            ${parts.received ?? ""}
            ${parts.source ?? ""}
          </span>
          ${parts.content ?? ""}
        </div>
        `,
        ia
      );
    }

    /**
     * Template part for author
     * @param {Interaction} ia 
     */
    #part_author(ia) {
      let authorName = ia.author.name; 

      //replace emoji codes with img elements
      if (ia.author.emojis?.length > 0) {
        for (const emoji of ia.author.emojis) {
          const e = `<img src="${emoji.url}" alt="${emoji.code}" />`;
          authorName = authorName.replace(":" + emoji.code + ":", e);
        }
      }

      return this.helper.fillLiteralTemplate(
        `
        <a class="author" href="${ia.author.profile ?? ""}">${authorName}</a>
        `,
        ia
      );
    }

    /**
     * Template part for received date
     * @param {Interaction} ia 
     */
    #part_received(ia) {
      return this.helper.fillLiteralTemplate(
        `
        <span class="prep">on</span>
        <span class="received">${ia.received.toLocaleString('en-GB', { year:"numeric", month:"short", day:"numeric"})}</span>
        `,
        ia
      );
    }

    /**
     * Template part for origin
     * @param {Interaction} ia 
     */
    #part_origin(ia) {
      return this.helper.fillLiteralTemplate(
        `
        <span class="prep">on</span>
        <a href="${ia.source.url}" class="origin">${ia.source.origin}</a>
        `,
        ia
      );
    }

    /**
     * Template part for origin with post (title)
     * @param {Interaction} ia 
     */
    #part_origin_title(ia) {
      return this.helper.fillLiteralTemplate(
        `
        <span class="prep">in</span>
        <a href="${ia.source.url}" class="title">${ia.source.title}</a>
        <span class="prep">on</span>
        <span class="origin">${ia.source.sender}</span>
        `,
        ia
      );
    }

    /**
     * Template part for HTML content
     * @param {Interaction} ia 
     */
    #part_content_html(ia) {
      return this.helper.fillLiteralTemplate(
        `
        <div class="content">${ia.content.html}</div>
        `,
        ia
      );  
    }

    /**
     * Template part for text content
     * @param {Interaction} ia 
     */
    #part_content_text(ia) {
      return this.helper.fillLiteralTemplate(
        `
        <div class="content">
          <p>${ia.content.text}</p>
        </div>
        `,
        ia
      );  
    }

    /**
     * Template part for text content, excerpt only
     * @param {Interaction} ia 
     */
    #part_content_text_excerpt(ia) {
      return this.helper.fillLiteralTemplate(
        `
        <div class="content">
          <p>${ia.content.text?.slice(0,255) + " ..."}</p>
        </div>
        `,
        ia
      );  
    }

  }

}