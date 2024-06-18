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
  const limit = config.feed["limit"];

  const helpers = Object.keys(hexo.extend.helper.store).reduce((result, name) => {
    result[name] = hexo.extend.helper.get(name).bind({ ...hexo, page: {} });
    return result;
  }, {});

  const renderOptions = { path: template };

  return generateFeed(render, title, locals, config, renderOptions, {}, output, limit, helpers, log);
}

const generateFeed = (render, title, locals, config, renderOptions, context, output, limit, helpers, log) => { 
  log.debug(`Generating ${title}: %s`, magenta(output));

  let tags = locals.tags.toArray();
  let categories = locals.categories.toArray().map((cat) => {
    return {
      name: cat.name,
      path: cat.path
    }
  });
  categories.push({
    name: "Note",
    path: "notes"
  });

  // Merge POSTS with NOTES
  let items = [...locals.posts.data, ...locals.notes]
    .filter((i) => i.draft !== true)
    .filter((i) => i.published === undefined || i.published === true)
    .sort((a, b) => a.date.diff(b.date)).reverse()
    .slice(0, limit);

  const lastPublishedPostDate = items.slice(0, 1).date; //first item
  const lastBuildDate = helpers.moment();

  return render
    .render(renderOptions, {
      ...helpers,
      ...{
        tag: undefined,
        category: undefined,
        ...context
    },
      lastPublishedPostDate: lastPublishedPostDate,
      lastBuildDate: lastBuildDate,
      items: items,
      tags: tags,
      categories: categories,
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
