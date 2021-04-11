/*
    Anchorlist Tag

    Syntax
    {% anchorlist [title|anchor-id] %}
*/

hexo.extend.tag.register("anchorlist", function(args){

    var listAnchors = "";
    args.forEach(function(e) {
        var item = e.split("|"); 
        var title = item[0];
        var anchor = item[1];
        listAnchors += `<li data-anchor="#${anchor}">${title}</li>`;
    });

    var elements = `
        <ul class="anchorlist">
            ${listAnchors}
        </ul>
    `;

    return elements;
});