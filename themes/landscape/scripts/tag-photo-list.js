/*
    Photo List Tag

    Syntax:
    {% photo_list ..."assetPhotoName|title" %}

    The asset photo should be a copy of the mobile photo and has to have the original photo name
    
*/

hexo.extend.tag.register("photo_list", function(args){

    var list = "";
    args.forEach(function(e) {
      var item = e.split("|"); 
      var assetPhotoName = item[0];
      var title = item[1];

      var element = `
        <figure>
          <a href="/photos/${assetPhotoName}" class="no-break">
            <img src="${assetPhotoName}.jpg">
          </a>
          <figcaption>${title}</figcaption>
        </figure>
    `;

      list += element;
    });

    var id = "photo-list-" + Math.random().toString(36).substring(2,8);

    var elements = `
      <div class="photo-list" id="${id}">
        ${list}
      </div>
    `;

    return elements;
});