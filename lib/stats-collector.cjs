const fs = require("fs");
const path = require("path");
const yaml = require('js-yaml');

const { getHelpers, logobj } = require("./tools.cjs");
const en = new Intl.NumberFormat('en-US');

let _helpers;
let _locals;

class StatsCollector {

  constructor(hexo, locals) {
    _helpers = getHelpers(hexo);
    _locals = locals;
    //console.log(_locals);
  }

  getPostStats() {
    let result = {
      times: {
        firstPost: {
          date: null,
          dateISO: null,
          dateFormat: null,
          path: null,
          title: null
        },
        lastPost: {
          date: null,
          dateISO: null,
          dateFormat: null,
          path: null,
          title: null
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
        notes: _locals.notes.length,
        dynamic: {
          total: 0,
          pages: 0,          
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
        postsAll: null
      }
    };

    /** TIMES */
    let tim = result.times;

    let postsSorted = [..._locals.posts.data, ..._locals.notes]
      .map(p => { return { path: p.path.replaceAll("\\", "/").replace("index.html", ""), title: p.title, date: p.date }})
      .sort((a,b) => _helpers.moment(a.date).diff(b.date));
    
    tim.firstPost = postsSorted[0];
    tim.firstPost.dateISO = _helpers.moment(tim.firstPost.date).format("YYYY-MM-DD");
    tim.firstPost.dateFormat = _helpers.moment(tim.firstPost.date).format("dddd, DD MMMM YYYY");
    tim.lastPost = postsSorted[postsSorted.length - 1];
    tim.lastPost.dateISO = _helpers.moment(tim.lastPost.date).format("YYYY-MM-DD");
    tim.lastPost.dateFormat = _helpers.moment(tim.lastPost.date).format("dddd, DD MMMM YYYY");
    tim.daysSinceLastPost = _helpers.moment({}).diff(tim.lastPost.date, 'days');
    
    let dbflp = _helpers.moment(tim.lastPost.date).diff(tim.firstPost.date, 'days');
    tim.daysBetweenFirstLastPost = en.format(dbflp);
    tim.periodBetweenFirstLastPost.years = Math.floor(dbflp / 365);
    tim.periodBetweenFirstLastPost.months = Math.floor(dbflp % 365 / 30);
    tim.periodBetweenFirstLastPost.days = Math.floor(dbflp % 365 % 30);

    /** COUNTS */
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

    /** LISTS */
    result.lists.postsAll = postsSorted
      .map(p => _helpers.moment(p.date).format("YYYY-MM-DD"));

    // result.lists.postsYears = [..._locals.posts.data, ..._locals.notes]
    //   .sort((a,b) => _helpers.moment(a.date).diff(b.date))
    //   .reduce((acc, p) => {
    //     const year = "_" + _helpers.moment(p.date).year();
    //     if (!acc[year]) acc[year] = [];
    //     acc[year].push(_helpers.moment(p.date).format("YYYY-MM-DD"));
    //     return acc;
    //   }, {});
  
    
    logobj(result);
    return result;
  }

}
module.exports.StatsCollector = StatsCollector;