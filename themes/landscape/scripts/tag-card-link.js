/*
    Card Link Tag

    Syntax:
    {% cardlink %}
      content
    {% endcardlink %}

    Assumed content are line-by-line values:
    host: xxx 
    url: yyy
    ...

    -> see Obsidian Auto Card Links -> https://github.com/nekoshita/obsidian-auto-card-link
*/
hexo.extend.tag.register("cardlink", function(args, content){

  let lines = { x: null };

  content.split(/\r?\n/).forEach((line) => {
    let item = line.split(/:(.*)/s);
    let key = item[0];
    let value = item[1].replace(/["]/g, "").trim();
    lines[key] = value;
  });

  let eIcon = "";
  if (lines.favicon) {
    eIcon = `<img class="auto-card-link-favicon" src="${lines.favicon}" />`;
  }
  let eHost = "";
  if (lines.host) {
    eHost = `<span>${lines.host}</span>`;
  }
  let eImage = "";
  if (lines.image) {
    eImage = `<img class="auto-card-link-thumbnail" src="${lines.image}" />`;
  }
  
  let element = `
    <div class="auto-card-link-container">
      <a class="auto-card-link-card">
        <div class="auto-card-link-main">
          <div class="auto-card-link-title">${lines.title}</div>
          <div class="auto-card-link-description">${lines.description}</div>
          <div class="auto-card-link-host">${eIcon}${eHost}</div>
        </div>
        ${eImage}
      </a>
    </div>
  `;

  return element;

}, {ends: true});