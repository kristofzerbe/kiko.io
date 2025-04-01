/*
  Peertube Video Tag

  Syntax:
  {% peertube "instance" "id" %}

*/
hexo.extend.tag.register('peertube', function (args) {

  const [
    instance,
    id
  ] = args;

  let element = `
    <div class="video-container">
    <iframe src="https://${instance}/videos/embed/${id}"frameborder="0" allowfullscreen loading="lazy"></iframe>
    </div>
  `;

  return element;
});