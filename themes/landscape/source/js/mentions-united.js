/**
 * Mentions United script
 */
const mentionsUnited = {
  plugins: {},

  register(plugin, args) {
    const { name } = plugin;
    plugin.options = args;
    this.plugins[name] = plugin;
  },

  load() {
    for (const p in this.plugins) {
      this.plugins[p].retrieve();
    }
  }

}
const mentionsUnitedReaction = class  {
  constructor() {
    this.author = new mentionsUnitedAuthor();
  }
  author;
  received;
  type;
  source;
  sender;
  protocol;
  url;
  content;
  toObject() {
    const {...object} = this;
    object.author = this.author.toObject();
    return object; 
  }
}
const mentionsUnitedAuthor = class {
  name;
  avatar;
  profile;
  toObject() {
    const {...object} = this;
    return object; 
  }
}