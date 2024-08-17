
/**
 * Mentions United plugin for retreiving webmentions from webmention.io
 * 
 * Options:
 *  - targetUrl  = URL of the page mentioned
 *  - aliasUrl   = alternative URL of the page
 *  - authorName = Author's name to determine if a wm is a reply of the owner
 */
const mentionsUnited_webmentions = {
  name: "webmention.io",
  options: { 
    targetUrl: "", 
    aliasUrl: "",
    authorName: ""
  },
  retrieve: function () {
    console.info(`Retreiving webmentions for '${this.options.host}'`);
    console.log(this.options);

    let reactions = [];

    // load webmentions from webmention.io into 'reactions'
    
    return reactions;
  }
}