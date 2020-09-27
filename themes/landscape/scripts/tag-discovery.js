/*
  Discovery Tag

  Syntax
  {% discovery [title] [author] [url] [imgFolder] [imgTitle] [imgExt] %}
    content
  {% enddiscovery %}

*/

hexo.extend.tag.register("discovery", function(args, content){

  var title, author, url, imgFolder, imgTitle, imgSrc, imgExt;

  title = args[0];
  author = args[1];
  url = args[2];
  imgFolder = args[3];
  imgTitle = args[4];
  imgExt = args[5];

  imgSrc = imgFolder + "/" + imgTitle.toLowerCase().split(" ").join("-") + '.' + imgExt;

  content = hexo.render.renderSync({ text: content, engine: 'markdown' });

  var element = `
    <hr/>
    <h2 style="margin-bottom: 10px;">
      ${title}
    </h2>
    <small>by ${author}&nbsp;:&nbsp;<a href="${url}" target="_blank" rel="noopener">${url}</a></small>
    ${content}
    <a style="display:block; margin: 10px 0 30px;" href="${url}" target="_blank" rel="noopener">
      <img src="${imgSrc}" alt="${imgTitle}" />
    </a>
  `;

  return element;

}, {ends: true});