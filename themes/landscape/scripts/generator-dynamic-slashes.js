const log = require('hexo-log')({ debug: false, silent: false });
const { magenta } = require('chalk');
const path = require('path');
const fs = require('hexo-fs');
const front = require('hexo-front-matter');

hexo.extend.generator.register("dynamic-slashes", async function(locals) {
  let config = this.config;

  log.info("Processing dynamic slashes...");

  let page = {};
  page.name = "slashes";

  // Get MD data
  const mdSource = path.join(config.source_dir, "_dynamic", page.name + ".md");
  const md = fs.readFileSync(mdSource);
  let fm = front.parse(md);
  page = {...page, ...fm};

  // Convert Markdown content into HTML
  page.content = hexo.render.renderSync({ text: page._content, engine: 'markdown' });
  page.items = [];

  page.items.push({
    title: "/About",
    path: "/about",
    teaser: "On this page I tell you a little bit about myself...",
    photograph: {
      file: "$about.jpg",
      name: ""
    }
  });
  page.items.push({
    title: "/#Contact",
    path: "/about/#contact",
    teaser: "Not a classic slash, but a hash that works on every page and provides information to get in touch with me",
    photograph: {
      file: "22-08-Bretagne-Jersey-1381.jpg",
      name: "Jersey Love"
    }
  });
  page.items.push({
    title: "/Search",
    path: "/search",
    teaser: "Full text search across the entire site",
    photograph: {
      file: "$D702858.jpg",
      name: "Hide and Seek"
    }
  });
  page.items.push({
    title: "/Colophon",
    path: "/colophon",
    teaser: "Coming soon ... A few words about how this blog is structured, created and hosted",
    photograph: {
      file: "$23-07-Mallorca-0773.jpg",
      name: "Table Greenery"
    }
  });
  page.items.push({
    title: "/Feeds",
    path: "/feeds",
    teaser: "Aggregation of the articles as Atom, RSS, JSON or HTML feed",
    photograph: {
      file: "$23-05-Holland-0806.jpg",
      name: "Knitting Colors"
    }
  });
  page.items.push({
    title: "/Sitemap.xml",
    path: "/sitemap.xml",
    teaser: "A classic machine-readable sitemap in XML format",
    photograph: {
      file: "D50_7084_2405.jpg",
      name: "Thomas Garden 24-05 VII"
    }
  });
  page.items.push({
    title: "/Impressum",
    path: "/impressum",
    teaser: "A German necessity that shows who is responsible for the content ... Legal stuff in German",
    photograph: {
      file: "$DSC_3117.jpg",
      name: "Instructions"
    }
  });

  let result = {
      data: page,
      path: path.join(page.name, "index.html"),
      layout: "slashes"
  };

  return result;

});
