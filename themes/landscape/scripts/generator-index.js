/* 
  This generator is a CUSTOMIZED COPY (due to note integration) 
  of the default 'index'-generator:
  https://github.com/hexojs/hexo-generator-index
*/

const pagination = require('hexo-pagination');

hexo.config.index_generator = Object.assign({
  per_page: typeof hexo.config.per_page === 'undefined' ? 10 : hexo.config.per_page,
  order_by: '-date'
}, hexo.config.index_generator);

hexo.extend.generator.register("index", function (locals) {

  const config = this.config;

  //const posts = locals.posts.sort(config.index_generator.order_by);
  //TODO: Consider Sticky
  //??? posts.data.sort((a, b) => (b.sticky || 0) - (a.sticky || 0));
  
  // Merge POSTS with NOTES
  const items = [...locals.posts.data, ...locals.notes];

  // Sort over all by date ascending -> date|updated: Moment<...>
  //TODO: Consider UPDATED
  items.sort((a, b) => a.date.diff(b.date)).reverse();

  const paginationDir = config.pagination_dir || 'page';
  const path = config.index_generator.path || '';

  return pagination(path, items, {
    perPage: config.index_generator.per_page,
    layout: ['index'],
    format: paginationDir + '/%d/',
    data: {
      __index: true
    }
  });

});
