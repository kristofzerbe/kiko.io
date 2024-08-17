
/**
 * Mentions United plugin for retreiving reactions from DevTo
 *
 * Options:
 *  - targetUrl  = URL of the page mentioned
 *  - sourceUrl  = URL of dev.to article
 *  - sourceId   = ID of dev.to article (only available over API)
 *
 * Remarks:
 *  - If 'sourceId' is not provided, the article will fetched over the published articles list
 */
const mentionsUnited_devto = {
  name: "dev.to",
  options: {
    targetUrl: "",
    sourceUrl: "",
    sourceId: 0
  },
  retrieve: function () {
    console.log(`Retreiving devto reactions on ${this.options.url}`);
    console.log(this.options);

    let reactions = [];

    // load reactions from dev.to into 'reactions'

    // let r = new mentionsUnitedReaction();
    // r.author.name = "Me";
    // r.author.avatar = "http//xxx.com";
    // r.author.profile = "https://yyy.com"
    // r.type = "comment";
    // console.log(r);
    // let ro = r.toObject();
    // console.log(ro);

    reactions.push(r);
    //console.log(reactions);

    return reactions;
  }
}
