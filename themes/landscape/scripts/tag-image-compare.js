/*
  Image Compare Viewer: https://image-compare-viewer.netlify.app/

  Syntax
  {% image_compare [id] [imgFileOriginal] [imgFileModified] [mode] %}

*/
hexo.extend.tag.register('image_compare', function (args) {
    
  const [
    id, 
    original, 
    modified,
    mode
  ] = args;

  var verticalMode = (mode === "vertical").toString();

  var element = `
    <div id="${id}">
      <img class="image-compare image-original" src="${original}" alt="" />
      <img class="image-compare image-modified" src="${modified}" alt="" />
    </div>
    <script>
      var themeColor = "#ffffff";
      if (localStorage.getItem("theme") === 'dark') {
        themeColor = "#222222"
      }
      new ImageCompare(document.getElementById("${id}"),
      {
        controlColor: themeColor,
        controlShadow: false,
        verticalMode: ${verticalMode},
        showLabels: true,
        labelOptions: {
          before: 'Original',
          after: 'Preset',
          onHover: true,
        }
      }).mount();
    </script>
  `;
  
  return element;
});