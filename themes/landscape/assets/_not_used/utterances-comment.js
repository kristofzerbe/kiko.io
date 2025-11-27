function insertUtterancesCommentBlock() {

  var commentTheme = "github-light";
  if(localStorage.getItem("theme")) {
    if(localStorage.getItem("theme") === "dark"){
      commentTheme = "github-dark";
    }
  }
  const scriptId = "comment-theme-script";
  const existingScript = document.getElementById(scriptId);
  if (!existingScript) {
    const commentScript = document.createElement("script");
    commentScript.id = scriptId;
    commentScript.src = "https://utteranc.es/client.js";
    commentScript.setAttribute("repo", "kristofzerbe/kiko.io");
    commentScript.setAttribute("issue-term", "pathname");
    commentScript.setAttribute("label", "comment");
    commentScript.setAttribute("theme", commentTheme);
    commentScript.setAttribute("crossorigin", "anonymous");
    const placeholder = document.getElementById("comment-placeholder");
    if (placeholder) {
      placeholder.innerHTML = "";
      placeholder.appendChild(commentScript);  
    }
  }
}

//observe theme change, to adjust comment block theme
var target = document.documentElement,
    observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributionName === "data-theme" );
                insertUtterancesCommentBlock();
            });        
    }),
    config = { attributes: true };
observer.observe(target, config);
 