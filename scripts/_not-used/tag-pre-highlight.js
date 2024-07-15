/*
  PRE Highlight Tag

  Syntax
  {% pre-highlight %}
    content
  {% endpre-highlight %}

*/

hexo.extend.tag.register("pre_highlight", function(args, content){

  let element = `
    <figure class="highlight">
        <pre>${content}</pre>
    </figure>
  `;

  return element;

}, {ends: true});