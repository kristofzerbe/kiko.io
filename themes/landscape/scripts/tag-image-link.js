/*
  Image Link

  Syntax
  {% image_link [path] [url] [alt] %}

*/
hexo.extend.tag.register('download_link', function (args) {
    
  const [
    path,
    url,
    alt 
  ] = args;
  
  var element = `
    <a href="${url}">
        <img src="${path}" alt="${alt}" />>
    </a>
    `;
    
  return element;
});