/*
    MoreInfo Tag with Label

    Syntax
    {% moreinfo_label "MoreInfo:" '[
        [ "publisher", "title", "url" ]
    ]' %}
*/

hexo.extend.tag.register("moreinfo_label", function(args){

    var text = args[0];
    var links = JSON.parse(args[1]); // without 'list' attribute as in moreinfo ... easier

    var list = "";
    links.forEach(function(item) {
      var publisher = (item[0]) ? item[0] + ": " :"",
          title = item[1],
          url = item[2]
      list += `<li>${publisher}<a href="${url}">${title}</a></li>`;
    });

    var elements = `
      <label class="moreinfo">${text}</label>
      <ul class="moreinfo-list">
        ${list}
      </ul>
    `;

    return elements;
});