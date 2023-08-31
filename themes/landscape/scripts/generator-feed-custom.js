/**
 * Adapted from hexo-feed@1.1.1 plugin : https://github.com/sergeyzwezdin/hexo-feed
 */

hexo.extend.generator.register("feed-atom-full", function(locals) {
  return baseGenerator(hexo, locals, "Atom Full", "./templates/feed-posts-atom-full.ejs", "atom.xml");
});
hexo.extend.generator.register("feed-atom-excerpt", function(locals) {
  return baseGenerator(hexo, locals, "Atom Excerpt", "./templates/feed-posts-atom-excerpt.ejs", "atom-excerpt.xml");
});

hexo.extend.generator.register("feed-rss-full", function(locals) {
  return baseGenerator(hexo, locals, "RSS Full", "./templates/feed-posts-rss-full.ejs", "rss.xml");
});
hexo.extend.generator.register("feed-rss-excerpt", function(locals) {
  return baseGenerator(hexo, locals, "RSS Excerpt", "./templates/feed-posts-rss-excerpt.ejs", "rss-excerpt.xml");
});

hexo.extend.generator.register("feed-json-full", function(locals) {
  return baseGenerator(hexo, locals, "JSON Full", "./templates/feed-posts-json-full.ejs", "feed.json");
});
hexo.extend.generator.register("feed-json-excerpt", function(locals) {
  return baseGenerator(hexo, locals, "JSON Excerpt", "./templates/feed-posts-json-excerpt.ejs", "feed-excerpt.json");
});

/** -------------- */
const { magenta } = require('chalk');

const baseGenerator = (hexo, locals, type, template, output) => {
  const { config, render, log } = hexo;
  const { posts, tags, categories } = locals;
  const order_by = config.feed["order_by"];
  const limit = config.feed["limit"];

  const helpers = Object.keys(hexo.extend.helper.store).reduce((result, name) => {
    result[name] = hexo.extend.helper.get(name).bind({ ...hexo, page: {} });
    return result;
  }, {});

  const itemCount = limit;

  const renderOptions = { path: template };

  return generateFeed(render, type, posts, tags, categories, config, renderOptions, {}, output, order_by, itemCount, helpers, log);
}

const generateFeed = (render, type, posts, tags, categories, config, renderOptions, context, output, order_by, limit, helpers, log) => { 
  log.debug(`Generating ${type}: %s`, magenta(output));

  const publishedPosts = posts
    .filter((post) => post.draft !== true)
    .filter((post) => post.published === undefined || post.published === true);

    const lastPublishedPost = publishedPosts.sort('-date').first();
    const lastPublishedPostDate = lastPublishedPost ? lastPublishedPost.date : helpers.moment();

    let postsToRender = publishedPosts.sort(order_by || config.feed.order_by || '-date');

    if (limit) {
        postsToRender = postsToRender.limit(limit);
    }

    return render
      .render(renderOptions, {
        ...helpers,
        ...{
          tag: undefined,
          category: undefined,
          ...context
      },
        lastBuildDate: lastPublishedPostDate,
        posts: postsToRender.toArray(),
        tags: tags.toArray(),
        categories: categories.toArray(),
        config: config,
        output: output
      })
      .then((content) => {
        log.debug(`${type} generated: %s`, magenta(output));

        return [
          {
            path: output,
            data: content
          }
        ];
      });

}
