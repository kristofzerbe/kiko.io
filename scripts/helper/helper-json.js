const { htmlTag, url_for } = require('hexo-util');

hexo.extend.helper.register('json', function(...args){
  let result = '\n';
  
  args.flat(Infinity).forEach(item => {

    if (typeof item === 'string' || item instanceof String) {
      
      // args = String only
      let path = item;
      if (!path.endsWith('.json')) {
        path += '.json';
      }
      result += `<script src="${url_for.call(this, path)}" type="application/json"></script>\n`;

    } else {

      // args = Object -> Custom Attributes
      item.src = url_for.call(this, item.src);
      item.type = "application/json";
      if (!item.src.endsWith('.json')) item.src += '.json';
      result += htmlTag('script', { ...item }, '') + '\n';
    
    }
  });
  return result;
});