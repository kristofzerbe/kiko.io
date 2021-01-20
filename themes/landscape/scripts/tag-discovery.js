/*
  Discovery Tag

  Syntax
  {% discovery [title] [author] [url] [imgFolder] [imgFile] %}
    content
  {% enddiscovery %}

*/

hexo.extend.tag.register("discovery", function(args, content){

  var title, author, url, imgFolder, imgFile, imgSrc;

  title = args[0];
  author = args[1];
  url = args[2];
  imgFolder = args[3];
  imgFile = args[4];

  imgSrc = imgFolder + "/" + imgFile;
  anchorId = imgFile.split('.')[0];

  content = hexo.render.renderSync({ text: content, engine: 'markdown' });

  var element = `
    <hr id="${anchorId}"/>
    <h2 style="margin-bottom: 10px;">
      ${title}
    </h2>
    <small>by ${author}&nbsp;<br><a href="${url}" target="_blank" rel="noopener">${url}</a></small>
    ${content}
    <a style="display:block; margin: 10px 0 30px;" class="img-link" href="${url}" target="_blank" rel="noopener">
      <img src="${imgSrc}" alt="${title}" />
    </a>
  `;

  return element;

}, {ends: true});