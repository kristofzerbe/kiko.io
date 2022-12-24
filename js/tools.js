function addStylesheet(url, id) {

    var stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.type = 'text/css';
    stylesheet.href = url;
  
    if (id) { stylesheet.setAttribute("id", id); }
    document.getElementsByTagName('head')[0].appendChild(stylesheet);
  }

  function addScriptAsync(url) {
    return new Promise(function(resolve, reject) {
  
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = url;
  
      script.addEventListener("load", function() {
        resolve(script);
      }, false);
  
      script.addEventListener("error", function() {
        reject(script);
      }, false);
  
      document.getElementsByTagName('head')[0].appendChild(script);
    });
  }