const log = require("hexo-log")({ debug: false, silent: false });
const { magenta, green, grey } = require("chalk");
const Webmention = require("@remy/webmention/shared/lib/webmention");

function mapPost(p) {
  return {
    title: p.title,
    slug: p.slug,
    permalink: p.permalink,
  };
}

hexo.extend.console.register(
  "webmention",
  "Send Webmentions to external URL's of latest post",
  {
    options: [
      { name: "--slug", desc: "Slug of post to process" },
      { name: "--count", desc: "Number of latest posts to process" },
      { name: "--send", desc: "Send Webmentions" },
    ],
  },
  function (args) {
    let opt = {
      count: 1,
      send: false,
    };
    if (args.count) opt.count = args.count;
    if (args.send) opt.send = args.send;
    opt.slug = args.slug;

    log.debug(magenta(JSON.stringify(opt)));

    return this.load().then(() => {
      //const posts = this.model("Post");

      // Merge POSTS with NOTES
      const items = [...this.locals.get('posts').data, ...this.locals.get('notes')];

      let data;

      if (opt.slug) {
        data = items
          .filter((p) => p.slug.toLowerCase() === opt.slug.toLowerCase())
          .map((p) => {
            return mapPost(p);
          });
      } else {
        data = items
          //.sort({ date: -1 })
          .sort((a, b) => a.date.diff(b.date)).reverse()
          .filter((p) => p.published != false && p.hidden != true)
          .slice(0, opt.count)
          .map((p) => {
            return mapPost(p);
          });
      }

      log.debug(data);

      const wm = new Webmention({ limit: 0, send: opt.send, debug: true });
      const clearLine = () => {
        if (process.stdout.isTTY) {
          process.stdout.clearLine();
          process.stdout.cursorTo(0);
        }
      };
      wm.on("error", (e) => log.error(e));
      wm.on("log", (e) => log.debug(grey(e)));
      wm.on("endpoints", clearLine);
      if (!opt.send) {
        wm.on("endpoints", (res) => {
          res.map((res) => {
            log.info("Webmention endpoint found at " + magenta(res.source));
            log.info(`Target: ${res.target}`);
            log.info(`Endpoint: ${res.endpoint.url} (${res.endpoint.type})`);
            log.info("---");
          });
        });
      }
      wm.on("sent", (res) => {
        log.info(green("Sending Webmention for " + magenta(res.source)));
        log.info(`Endpoint: ${res.endpoint.url} (${res.endpoint.type})`);
        log.info(`Target: ${res.target}`);
        log.info(`Status: ${res.status} ${res.status < 400 ? "✔︎" : "✖︎"}`);
        if (res.error) log.error("Error: " + res.error);
        log.info("");
      });

      for (const e of data) {
        log.info("Webmention parsing for " + magenta(e.permalink));
        wm.fetch(e.permalink);
      }
    });
  }
);
