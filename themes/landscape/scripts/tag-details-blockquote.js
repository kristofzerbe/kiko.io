/*
  Details Blockquote Tag

  Syntax
  {% details_blockquote [summary] [cite] [citeUrl] %}
    quote
  {% enddetails_blockquote %}

*/

hexo.extend.tag.register("details_blockquote", function(args, content){

  var summary, cite, citeUrl;

  summary = args[0];
  cite = args[1];
  citeUrl = args[2];

  quote = hexo.render.renderSync({ text: content, engine: 'markdown' });

  let eCite;
  if (citeUrl) {
      eCite = `<cite><a href="${citeUrl}">--- ${cite}</a></cite>`;
  } else {
    eCite = `<cite>--- ${cite}</cite>`;
  }

  let element = `
    <details>
        <summary>${summary}</summary>
        <blockquote>${quote}</blockquote>
        ${eCite}
    </details>
  `;

  return element;

}, {ends: true});