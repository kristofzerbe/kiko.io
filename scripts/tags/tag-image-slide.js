/*
    Image Slide Tag: https://github.com/ganlanyuan/tiny-slider

    Syntax:
    {% image_slide ..."assetImg|title|width" %}
    
*/

hexo.extend.tag.register("image_slide", function(args){
  let assetPath = "/" + this.path;

  let list = "";
  args.forEach(function(e) {
    let item = e.split("|"); 
    let assetImg = item[0];
    let title = item[1];
    let width = item[2] || "100%";

    if (assetImg.startsWith("/")) { assetPath = ""; }

    list += `<div><img width="${width}" src="${assetPath + assetImg}" alt="${title}" /></div>`
  });

  let id = "image-slide-" + Math.random().toString(36).substring(2,8);

  let elements = `
    <div class="image-slider" id="${id}">
      ${list}
    </div>
    <script>
      tns({
        container: "#${id}",
        items: 1,
        slideBy: "page",
        controls: false,
        nav: true
      });
    </script>
  `;

  return elements;
});