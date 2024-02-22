/*
    Feed Link Tag

    Syntax:
    {% feed_link "config.feed.feed_types.name", "class" %}
    
*/
hexo.extend.tag.register("feed_link", function(args){

  const [
    feedName,
    className
  ] = args;

  let feed = hexo.config.feed.feed_types.find(e => e.name === feedName);

  let element = `
    <a href="/${feed.output}" class="${className}">
      <span><strong>${feed.title}</strong> (${feed.output})</span>
    </a>
  `;

  return element;
});