/*
    Anchorlist Tag

    Syntax
    {% anchorlist [title|anchor-id] %}
*/

hexo.extend.tag.register("anchorlist", function(args){

    var listSimple = "";
    var listAnchors = "";
    args.forEach(function(e) {
        var item = e.split("|"); 
        var title = item[0];
        var anchor = item[1];
        listSimple += `<li>${title}</li>`;
        listAnchors += `<li><a href="#${anchor}">${title}</a></li>`;
    });

    var elements = `
        <ul class="simplelist">
            ${listSimple}
        </ul>
        <ul class="anchorlist" style="display:none;">
            ${listAnchors}
        </ul>
    `;

    return elements;
});