/*
  Source Tag (stripped Discovery Tag)

  Syntax
  {% source [title] [url] [category] [assetFolder] [imgFile] %}
    content
  {% endsource %}

*/

hexo.extend.tag.register("source", function(args, content){

  var title, url, imgFile, imgSrc;

  title = args[0];
  url = args[1];
  imgFile = args[2];

  imgSrc = imgFile;

  content = hexo.render.renderSync({ text: content, engine: 'markdown' });

  var element = `
    <h2 style="margin-bottom: 10px;">${title}</h2>
    <small><a href="${url}">${url}</a></small>
    ${content}
    <a style="display:block; margin: 10px 0 30px;" class="img-link" href="${url}">
      <img src="${imgSrc}" alt="${title}" />
    </a>
  `;

  return element;

}, {ends: true});