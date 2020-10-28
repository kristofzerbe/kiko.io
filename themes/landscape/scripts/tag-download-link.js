/*
  Download Link

  Syntax
  {% download_link [addCaption] [file] %}

*/
hexo.extend.tag.register('download_link', function (args) {
    
  const [
    addCaption,
    file 
  ] = args;
  
  var caption = "Download ";
  if (addCaption) { 
    caption += addCaption + " "; 
  }

  var fileName = file.substring(file.lastIndexOf('/') + 1);

  var element = `
    <p class="download-link">
      <a class="button" href="${file}" download>
        ${caption}<strong>${fileName}</strong>
      </a>
    </p>
    `;
    
  return element;
});