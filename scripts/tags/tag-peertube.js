/*
  Peertube Video Tag

  Syntax:
  {% peertube "instance" "id" "title" %}

*/
hexo.extend.tag.register('peertube', function (args) {

  const [
    instance,
    id,
    title
  ] = args;

  let element = `
    <div class="video-container">
    <iframe src="https://${instance}/videos/embed/${id}" title="${title}" frameborder="0" allowfullscreen loading="lazy"></iframe>
    </div>
  `;

  return element;
});