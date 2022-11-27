/* 
    Post Permalink 

    https://github.com/hexojs/hexo/issues/2605
    https://gist.github.com/seaoak/57886a2e91b5d31ffb5d0fe01fe21c74

    Syntax:
    {% post_permalink [slug] %}
*/
hexo.extend.tag.register('post_permalink', function (args) {
  const slug = args.shift();
  if (!slug) return this.permalink;

  const post = hexo.model('Post').findOne({slug: slug});
  if (!post) return;

  return post.permalink;
});