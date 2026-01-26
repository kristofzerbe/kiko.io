const jsdom = require("jsdom");

const { getHelpers, logobj, slugify } = require("./tools.cjs");
const en = new Intl.NumberFormat('en-US');

let _helpers;
let _locals;

class StatsCollector {

  constructor(hexo, locals) {
    _helpers = getHelpers(hexo);
    _locals = locals;
    //console.log(_locals);
  }

/** --------------------------------------------------------------------------------------
   * Get all post data
   * @returns Object
   */
  getPostStats() {
    let result = {
      times: {
        firstPost: {
          path: null,
          title: null,
          date: null,
          dateISO: null,
          dateFormat: null
        },
        lastPost: {
          path: null,
          title: null,
          date: null,
          dateISO: null,
          dateFormat: null
        },
        daysSinceLastPost: 0,
        daysBetweenFirstLastPost: 0,
        periodBetweenFirstLastPost: {
          years: 0,
          months: 0,
          days: 0
        }
      },
      counts: {
        articles: _locals.posts.length,
        pages: _locals.pages.length,
        categories: _locals.categories.length,
        tags: _locals.tags.length,
        series: {
          count: -1,
          articles: 0
        },
        projects: {
          count: 0,
          articles: 0
        },
        notes: _locals.notes.length,
        dynamic: {
          total: 0,
          pages: 0,          
        },
        syndications: {
          posts: 0,
          photos: 0
        },
        tinytools: 0,
        blogroll: 0,
        concerts: 0,
        boxes: 0,
        photos: {
          total: 0,
          used: {
            total: 0,
            start: 0,
            post: 0,
            page: 0,
            dynamic: 0
          },
          unused: {
            total: 0,
            pool: 0,
            reserve: 0,
            shed: 0
          }
        }
      },
      lists: {
        postsAll: null,
        postsPerYear: null,
        postsPerCategory: null,
        postsPerTopTenTag: null,
        syndicationsPerHost: null,
        photosPerCamera: null,
        series: null,
        projects: null
      }
    };

    let postsSorted = [..._locals.posts.data, ..._locals.notes]
      .map(p => { return { 
        path: p.path.replaceAll("\\", "/").replace("index.html", ""), 
        title: p.title, 
        date: p.date,
        dateISO: _helpers.moment(p.date).format("YYYY-MM-DD"),
        dateFormat: _helpers.moment(p.date).format("dddd, DD MMMM YYYY")
      }})
      .sort((a,b) => _helpers.moment(a.date).diff(b.date));
    
    /** TIMES posts */
    let tim = result.times;

    tim.firstPost = postsSorted[0];
    tim.lastPost = postsSorted[postsSorted.length - 1];
    tim.daysSinceLastPost = _helpers.moment({}).diff(tim.lastPost.date, 'days');
    
    let dbflp = _helpers.moment(tim.lastPost.date).diff(tim.firstPost.date, 'days');
    tim.daysBetweenFirstLastPost = en.format(dbflp);
    tim.periodBetweenFirstLastPost.years = Math.floor(dbflp / 365);
    tim.periodBetweenFirstLastPost.months = Math.floor(dbflp % 365 / 30);
    tim.periodBetweenFirstLastPost.days = Math.floor(dbflp % 365 % 30);

    /** COUNTS dynamic */
    let od = Object.entries(_locals.dynamic);
    let cnt = result.counts;
    let dt = od.length;
    let bx = od.filter(([k, v]) => v.name === "photos-box").length;
    let pt = od.filter(([k, v]) => v.photo === true).length;

    cnt.dynamic.total = en.format(dt);
    cnt.dynamic.pages = en.format(dt - (bx + pt));

    cnt.tinytools = en.format(_locals.dynamic.tinytools.items.length);
    cnt.blogroll  = en.format(_locals.dynamic.blogroll.items.length);
    cnt.concerts  = en.format(_locals.dynamic.concerts.items.filter((c => c.date > tim.firstPost.date)).length);
    cnt.boxes     = en.format(bx);
    
    cnt.photos.total          = en.format(pt);
    cnt.photos.used.total     = en.format(od.filter(([k, v]) => v.photo === true && v.status === "used").length);
    cnt.photos.used.start     = en.format(od.filter(([k, v]) => v.photo === true && v.status === "used" && v.type === "start").length);
    cnt.photos.used.post      = en.format(od.filter(([k, v]) => v.photo === true && v.status === "used" && v.type === "post").length);
    cnt.photos.used.page      = en.format(od.filter(([k, v]) => v.photo === true && v.status === "used" && v.type === "page").length);
    cnt.photos.used.dynamic   = en.format(od.filter(([k, v]) => v.photo === true && v.status === "used" && v.type === "dynamic").length);
    cnt.photos.unused.total   = en.format(od.filter(([k, v]) => v.photo === true && v.status === "unused").length);
    cnt.photos.unused.pool    = en.format(od.filter(([k, v]) => v.photo === true && v.status === "unused" && v.type === "pool").length);
    cnt.photos.unused.reserve = en.format(od.filter(([k, v]) => v.photo === true && v.status === "unused" && v.type === "reserve").length);
    cnt.photos.unused.shed    = en.format(od.filter(([k, v]) => v.photo === true && v.status === "unused" && v.type === "shed").length);

    /** COUNTS anything */
    let seriesPosts = _locals.posts.data.filter((p) => { return !!p.series; });
    cnt.series.articles = seriesPosts.length;
    result.lists.series = seriesPosts.reduce((acc, p) =>{
      acc[p.series] = acc[p.series] ? acc[p.series] + 1 : 1;
      return acc;
    },{});
    cnt.series.count = Object.keys(result.lists.series).length;

    let projectsPosts = _locals.posts.data.filter((p) => { return !!p.project; });
    cnt.projects.articles = projectsPosts.length;
    result.lists.projects = projectsPosts.reduce((acc, p) => {
      acc[p.project] = acc[p.project] ? acc[p.project] + 1 : 1;
      return acc;
    },{});
    cnt.projects.count = Object.keys(result.lists.projects).length;

    /** LISTS posts */
    result.lists.postsAll = postsSorted
      .map(p => _helpers.moment(p.date).format("YYYY-MM-DD"));

    /** per Year */
    result.lists.postsPerYear = [..._locals.posts.data, ..._locals.notes]
      .reduce((acc, p) => {
        const year = _helpers.moment(p.date).year();
        if (!acc[year]) acc[year] = {
          articles: 0,
          notes: 0
        };
        if (p.layout === "note") {
          acc[year].notes += 1;
        } else {
          acc[year].articles += 1;
        }
        return acc;
      }, {});

    /** per Category */
    let categories = [];
    _locals.posts.data
      .forEach(p => {
        let cat = p.categories.map(c => {
          return { name: c.name, slug: p.slug }
        });
        if (cat) categories.push(...cat);
      });
    result.lists.postsPerCategory = categories
      .reduce((acc, c) => {
        acc[c.name] = acc[c.name] ? acc[c.name] + 1 : 1;
        return acc;
      },{});

    /** per Top Ten Tags */
    let tags = [];
    _locals.posts.data
      .forEach(p => {
        let tag = p.tags.map(t => {
          return { name: t.name, slug: p.slug }
        });
        if (tag) tags.push(...tag);
      });
    result.lists.postsPerTopTenTag = tags
      .reduce((acc, t) => {
        acc[t.name] = acc[t.name] ? acc[t.name] + 1 : 1;
        return acc;
      },{});

    /** SYNDICATIONS */
    let synPhotos = Object.entries(_locals.dynamic)
      .filter(([k, v]) => { return k.startsWith("photo-"); })
      .map(([k, v]) => {
        return { type: "photo", slug: k, syndication: v.syndication }
      });
    let synPosts =  _locals.posts.data
      .filter((p) => { return !!p.syndication; })
      .map((p) => {
        return { type: "post", slug: p.slug, syndication: p.syndication }
      });

    let syndications = [];
    [...synPosts, ...synPhotos]
      .forEach(p => {
        let syn = p.syndication.map(s => { 
          return { host: s.host, url: s.url, type: p.type, item: p.slug } 
        });
        if (syn) syndications.push(...syn);
      });

    const synUnique = syndications.reduce((acc, s) => { //De-Dupe syndications by type & url
      const e = acc.find(i => i.type === s.type && i.url === s.url);
      if (!e) {
        return acc.concat([s]);
      } else {
        return acc;
      }
    }, []);

    result.lists.syndicationsPerHost = synUnique
      .reduce((acc, s) => {
        acc[s.host] = acc[s.host] ? acc[s.host] + 1 : 1;
        return acc;
      },{});

    let synCounts = synUnique
      .reduce((acc, s) => {
        acc[s.type] = acc[s.type] ? acc[s.type] + 1 : 1;
        return acc;
      },{});
    cnt.syndications.posts = en.format(synCounts.post);
    cnt.syndications.photos = en.format(synCounts.photo);

    /** LISTS photos */

    /** per Camera */
    result.lists.photosPerCamera = Object.entries(_locals.dynamic)
      .filter(([k, v]) => v.photo === true) //&& v.meta?.custom?.camera !== "Unknown")
      .map(([k, v]) => {
        return {
          name: k,
          camera: v.meta?.custom?.camera
          // year: v.meta?.custom?.year
        }
      })
      .reduce((acc, p) => {
        acc[p.camera] = acc[p.camera] ? acc[p.camera] + 1 : 1;
        return acc;
      },{});

    /** ---------- */
    
    //logobj(result);
    return result;
  }

  /**
   * Get all link data
   * @returns Object
   */
  getLinkStats() {
    let result = {
      links: null
    }

    //let posts = [..._locals.posts.data, ..._locals.notes]
    // _locals.posts.data.slice(0,1).forEach(p => {
    //   p.prev = null;
    //   console.log(p);
    // });
    // _locals.notes.slice(0,1).forEach(n => {
    //   console.log(n);
    // });

    //Note: .key + .content = HTML, ._content = MD
    // <a ... href="/
    // <a ... href="http

    //Post: .slug


    //logobj(result);
    return result;
  }

  /** --------------------------------------------------------------------------------------
   * Get all music data
   * @returns Object
   */
  getMusicStats() {
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
module.exports.StatsCollector = StatsCollector;