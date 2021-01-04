/*
    MoreInfo Tag

    Syntax
    {% moreinfo '{ "list": [
        [
            "PUBLISHER", "TITLE",
            "URL"
        ]
    ]}' %}
*/

hexo.extend.tag.register("moreinfo", function(args){

    var argList = JSON.parse(args[0]).list;

    //<li>SITE: <a target="_blank" rel="noopener" href="URL">TITLE</a></li>

    var list = "";
    argList.forEach(function(item) {
        var publisher = item[0],
            title = item[1],
            url = item[2]
        list += `<li>${publisher}: <a target="_blank" rel="noopener" href="${url}">${title}</a></li>`;
    });

    var elements = `
        <h2>More Info</h2>
        <ul class="moreinfo-list">
            ${list}
        </ul>
    `;

    return elements;
});