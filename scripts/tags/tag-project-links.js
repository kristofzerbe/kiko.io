/*
  Project Links Tag

  Syntax
  {% project_links [pname] %}

*/

hexo.extend.tag.register("project_links", function(args){

  const pname = args.shift();

  var elements = `
    <div class="brand-links">
      <a href="https://github.com/kristofzerbe/${pname}" class="github">
        <img src="/images/brands/github.svg" alt="Github" />
        <span>Github</span>
      </a>
      <a href="https://www.npmjs.com/package/${pname}" class="npm">
        <img src="/images/brands/npm.svg" alt="NPM" />
        <span>NPM</span>
      </a>
      <a href="https://deps.dev/npm/${pname}" class="insights">
        <img src="/images/brands/insights.svg" alt="Open Source Insights" />
        <span>Open Source Insights</span>
      </a>
    </div>        
  `;

  return elements;
});