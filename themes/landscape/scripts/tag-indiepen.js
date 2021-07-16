/*
  Indiepen Tag

  Syntax:
  {% indiepen [sampleSlug] [height] [defaultTab] %}
*/

hexo.extend.tag.register("indiepen", function(args, content){

  const [
    sampleSlug,
    height = hexo.config.indiepen.height || 450,
    defaultTab = hexo.config.indiepen.default_tab || "result"
  ] = args;  

  const url = encodeURIComponent(hexo.config.url + "/samples/" + sampleSlug);

  const element = `
    <iframe class="indiepen"
        src="https://indiepen.tech/embed/?url=${url}&tab=${defaultTab}"
        style="width: 100%; overflow: hidden; display: block; border: 0;"
        title="Indiepen Embed"
        loading="lazy" 
        width="100%" 
        height="${height}">
    </iframe>
  `;

  return element;

});