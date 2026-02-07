const { getHelpers, logobj, slugify } = require("./tools.cjs");

let _helpers;
let _locals;

class MusicCollector {

  constructor(hexo, locals) {
    _helpers = getHelpers(hexo);
    _locals = locals;
    //console.log(_locals);
  }

  /** --------------------------------------------------------------------------------------
   * Get all music data
   * @returns Object
   */
  getBandcampPosts() {
    let result = {      
      bandcamp: {
        count: 0,
        list: null
      }
    };

    let bandcampPosts = _locals.posts.data
      .filter((p) => {
        return !!p.bandcamp;
      });
    result.bandcamp.count = bandcampPosts.length;

    result.bandcamp.list = bandcampPosts 
      .map((p) => {
        let album = p.bandcamp.album.split("|");
        let track = p.bandcamp.track.split("|");
        return {
          artist: {
            name: p.bandcamp.artist,
            slug: slugify(p.bandcamp.artist)
          },
          album: {
            name: album[0],
            id: album[1]
          },
          track: {
            name: track[0],
            id: track[1]
          },
          post: {
            path: p.path,
            slug: p.slug,
            title: p.title,
            description: p.description,
            date: p.date,
            dateISO: _helpers.moment(p.date).format("YYYY-MM-DD"),
            dateFormat: _helpers.moment(p.date).format("dddd, DD MMMM YYYY")
          }
        };
      })
      .sort((a, b) => {
        return a.artist.name.localeCompare(b.artist.name) || a.album.name.localeCompare(b.album.name)
      })
      .reduce((acc, m) => {
        const aKey = m.artist.slug;
        if (!acc[aKey]) acc[aKey] = {
          artist: m.artist, 
          list: [] 
        };
        acc[aKey].list.push({
          album: m.album,
          track: m.track,
          post: m.post
        });
        return acc;
      }, {});

    //logobj(result);
    return result;
  }

}
module.exports.MusicCollector = MusicCollector;