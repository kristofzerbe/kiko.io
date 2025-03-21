/*
  Discovery Codepen Tag

  Syntax
  {% discovery_pen "title" "author" "url" [height] %}
    content
  {% enddiscovery_pen %}

*/

hexo.extend.tag.register("discovery_pen", function(args, content){

  const [
    title,
    author,
    url,
    height = hexo.config.codepen.height || 300,
    width = hexo.config.codepen.width || "100%"
  ] = args;

  const path = new URL(url).pathname.split('/'),
        authorKey = path[1],
        authorUrl = `https://codepen.io/${authorKey}`,
        penKey = path[3];

  content = hexo.render.renderSync({ text: content, engine: 'markdown' });

  var element = `
    <hr id="${penKey}"/>
    <h2>${title}</h2>
    <small class="link">by ${author}&nbsp;<br><a href="${authorUrl}">${authorUrl}</a></small>
    ${content}
    <iframe height="${height}" 
        id="codepen-${penKey}"
        class="codepen"
        src="${authorUrl}/embed/${penKey}?height=${height}&default-tab=result&theme-id=dark"
        style="width: ${width};" 
        scrolling="no" 
        title="Codepen: ${title}" 
        frameborder="no" 
        loading="lazy" 
        allowtransparency="true" 
        allowfullscreen="true">
    </iframe>
  `;

  return element;

}, {ends: true});