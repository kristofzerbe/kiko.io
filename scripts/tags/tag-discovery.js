/*
  Discovery Tag

  Syntax
  {% discovery "title" "author" "url" [assetFolder] [imgFile] %}
    content
  {% enddiscovery %}

*/

hexo.extend.tag.register("discovery", function(args, content){

  var title, author, url, assetFolder, imgFile, imgSrc;

  title = args[0];
  author = args[1];
  url = args[2];
  assetFolder = args[3];
  imgFile = args[4];

  imgSrc = imgFile;

  let anchorId = imgFile.split('.')[0];

  content = hexo.render.renderSync({ text: content, engine: 'markdown' });

  var element = `
    <hr id="${anchorId}"/>
    <h2 class="link">${title}</h2>
    <small>by ${author}&nbsp;<br><a href="${url}">${url}</a></small>
    ${content}
    <a style="display:block; margin: 10px 0 30px;" class="img-link" href="${url}">
      <img class="limit" src="${imgSrc}" alt="${title}" />
    </a>
  `;

  return element;

}, {ends: true});