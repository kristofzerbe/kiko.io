/*
  IndieNews Link

  Syntax:
  {% indienews %}
*/

hexo.extend.tag.register("indienews", function(){

  const element = `
    <a href="https://news.indieweb.org/en" class="u-syndication" style="display:none;">Posted on IndieNews</a>
  `;

  return element;

});