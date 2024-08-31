/**
 * Mentions United
 * 
 * Settings:
 *  - container {Node}    = HTML element into which the interactions are to be inserted
 *  - ownerName {String}  = Display the owner of the target (this) page ... your name
 */
class MentionsUnited {

  /** 
   * Basic structure where Provider plugins must extend from
   */
  static Provider = class Provider {
    name;
    options;
    async retrieve() {};
  }

  /** 
   * Basic structure where Renderer plugins must extend from
   */
  static Renderer = class Renderer {
    name;
    options;
    render() {};
  }

  /**
   * Representation of an interaction
   */
  static Interaction = class Interaction {
    static Source = class Source {
      provider;
      origin;
      sender;
      url;
      id;
      title;
      toObject() {
        const {...object} = this;
        return object;
      }
    }
    static Author = class Author {
      name;
      avatar;
      profile;  
      toObject() {
        const {...object} = this;
        return object;
      }
    }
    static Content = class Content {
      html;
      text;
      toObject() {
        const {...object} = this;
        return object;
      }
    }
    source;
    author;
    type;
    received;
    content; 
    constructor() {
      this.source = new Interaction.Source();
      this.author = new Interaction.Author();
      this.content = new Interaction.Content();
    } 
    toObject() {
      const {...object} = this;
      object.source = this.source.toObject();
      object.author = this.author.toObject();
      object.content = this.content.toObject();
      return object;
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////

  settings = {
    containerId: "",
    ownerName: ""
  };

  #providers = {};
  #renderers = {};

  #interactions = [];

  constructor(settings, plugins) {
    this.settings = { ...this.settings, ...settings };
    this.helper = new MentionsUnited.Helper();

    // register passed plugins directly
    if (plugins) {
      for (let p of plugins) { this.register(p) };
    }
  }

  /**
   * Registers a MentionsUnited plugin
   * @param {MentionsUnited plugin class} plugin 
   */
  register(plugin) {
    const { name } = plugin;

    if (plugin instanceof MentionsUnited.Provider) {
      this.#providers[name] = plugin;
    }

    if (plugin instanceof MentionsUnited.Renderer) {
      this.#renderers[name] = plugin;
    }

  }

  /**
   * Calls the 'retrieve' method of all registered Provider plugins to get array of Interactions
   */
  load() {
    let fetches = [];

    for (const p in this.#providers) {
      fetches.push(this.#providers[p].retrieve());
    }

    Promise.all(fetches)
      .then((results) => {
        for (const res of results) {
          this.#interactions = this.#interactions.concat(res);
        }
        
        //final processing of Interaction
        for (let ia of this.#interactions) {

          //ensure author.name and author.avatar
          if (!ia.author.name) { ia.author.name = "Unknown"; }
          this.helper.resolveAvatar(ia.author);

          //determine if author of Interaction is owner
          ia.isOwn = ia.author.name.startsWith(this.settings.ownerName);

          //convert into real date
          if (ia.received) ia.received = new Date(ia.received);
        };

        // sorting interactions based on the received date, while setting undefined to the end
        this.#interactions.sort((a, b) => { 
          const aDate = a.received !== undefined ? a.received : Infinity;
          const bDate = b.received !== undefined ? b.received : Infinity;
          return aDate - bDate; 
        });
        
        console.info("Interactions:", this.#interactions);

        this.show();

      })
      .catch(console.error)
  }

  /**
   * Calls the 'render' method of all registered Renderer plugins to display Interactions 
   */
  show() {

    for (const p in this.#renderers) {
      this.#renderers[p].render(this.#interactions);
    }

  }

  //////////////////////////////////////////////////////////////////////////////////////////

  /** 
   * Helper class with some tools, if needed
   */
  static Helper = class Helper {

    /**
     * Fetches JSON data from url synchronously
     * @param {String} url 
     * @returns {JSON}
     */
    fetchJsonSync(url) {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, false);
      xhr.send();
      if (xhr.status === 200) {
        const json = JSON.parse(xhr.responseText);
        return json;
      }
    }

    /**
     * Resolves the existence of an avatar image of the author
     * @param {Author} author 
     */
    resolveAvatar(author) {
      this.checkImageExists(author.avatar, () => {
        author.avatar = 
          "https://api.dicebear.com/9.x/initials/svg" + 
            "?seed=" + encodeURIComponent(author.name) +
            "&size=128" + 
            "&scale=75" + 
            "&fontWeight=600";
      });
    }

    /**
     * Check if remote image exists, with callback on error
     * @param {String} url 
     * @param {Function} callback
     */
    checkImageExists(url, callback) {
      if (url?.length > 0) {
        var img = new Image();
        img.onload = () => { return; }
        img.onerror = (error) => {
          console.error(error);
          callback();
        } 
        img.src = url;  
      } else {
        callback();
      }
    }
   
    /**
     * Converts HTML into element
     * @param {string} html 
     * @returns {Element}
     */
    createElementFromHtml(html) {
      let e = document.createElement("template");
      e.innerHTML = html.trim();
      return e.content.firstChild;
    }

    /**
     * Dynamic Tag Function for creating tagged template literals
     * @param {Array} templateString 
     * @param {Array} templateVars 
     * @returns {Function}
     */
    fillLiteralTemplate(templateString, templateVars) {
      var func = new Function(...Object.keys(templateVars),
        "return `" + templateString + "`.trim();"
      );
      return func(...Object.values(templateVars));
    }    
        
  }

}