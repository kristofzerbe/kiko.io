/*
  Asset Video Tag (https://github.com/stephenmkbrady/hexo-tag-html5)

  Syntax:
  {% video_asset "<filename>" %}

*/

hexo.extend.tag.register("video_asset", function(args){
  var assetPath = this.path;

  var filename = args[0],
      width = args[1] || "100%",
      height = args[2] || "250px";

  var codec = "video/mp4"; //TODO: Get from extension
     
  return ` 
    <video width="${width}" height="${height}" controls>
      <source src="/${assetPath + filename}" type="${codec}">
    </video>
  `;

});