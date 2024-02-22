/**
 * Adapted from hexo-feed@1.1.1 plugin : https://github.com/sergeyzwezdin/hexo-feed
 */

hexo.config.feed.feed_types.forEach(e => {
  if (e.generator === true) {
    hexo.extend.generator.register(e.name, function(locals) {
      return baseGenerator(hexo, locals, e.title, "./templates/" + e.name + ".ejs", e.output);
    });
  }
});

/** -------------- */
const { magenta } = require('chalk');

const baseGenerator = (hexo, locals, title, template, output) => {
  const { config, render, log } = hexo;
  const { posts, tags, categories } = locals;
  const order_by = config.feed["order_by"];
  const limit = config.feed["limit"];

  const helpers = Object.keys(hexo.extend.helper.store).reduce((result, name) => {
    result[name] = hexo.extend.helper.get(name).bind({ ...hexo, page: {} });
    return result;
  }, {});

  const renderOptions = { path: template };

  return generateFeed(render, title, posts, tags, categories, config, renderOptions, {}, output, order_by, limit, helpers, log);
}

const generateFeed = (render, title, posts, tags, categories, config, renderOptions, context, output, order_by, limit, helpers, log) => { 
  log.debug(`Generating ${title}: %s`, magenta(output));

  const publishedPosts = posts
    .filter((post) => post.draft !== true)
    .filter((post) => post.published === undefined || post.published === true);

    const lastPublishedPost = publishedPosts.sort('-date').first();
    const lastPublishedPostDate = lastPublishedPost ? lastPublishedPost.date : helpers.moment();

    let postsToRender = publishedPosts
      .sort(order_by || config.feed.order_by || '-date')
      .limit(limit || 20);

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
        log.debug(`${title} generated: %s`, magenta(output));

        return [
          {
            path: output,
            data: content
          }
        ];
      });

}
