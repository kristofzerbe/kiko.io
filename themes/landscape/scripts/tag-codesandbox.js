/*
  CodeSandbox Tag

  Syntax:
  {% codesandbox [slugHash] [title] %}
*/

hexo.extend.tag.register("codesandbox", function(args, content){

  const [
    slugHash,
    title
  ] = args;  

  const element = `
    <iframe 
        src="https://codesandbox.io/embed/${slugHash}?fontsize=14&hidenavigation=1&theme=dark"
        style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
        title="${title}"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts">
    </iframe>
  `
  return element;

});