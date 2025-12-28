/*
  Github Readme Details Tag

  Syntax:
  {% github_readme "user" "repo" ["summary"] %}

*/
const axios = require("axios");

hexo.extend.tag.register("github_readme", async function(args){

    if(hexo.status === "offline") { return null; }

    const [
      user,
      repo,
      summary = "Project README on Github"
    ] = args;

    let urlRepoApi = `https://api.github.com/repos/${user}/${repo}`;
    let resRepoApi = await axios.get(urlRepoApi);    
    const dataRepo = resRepoApi.data;

    let urlRaw = `https://raw.githubusercontent.com/${user}/${repo}/${dataRepo.default_branch}`

    return axios.get(urlRaw + "/README.md").then(function(resReadme) {

      //Render Markdown to HTML
      let content = hexo.render.renderSync({ text: resReadme.data, engine: 'markdown' });

      //Replace relative asset paths
      content = content.replace(/src="\//g, 'src="' + urlRaw + '/')

      const element = `
        <details class="github-readme">
          <summary>${summary}</summary>
          <div>${content}</div>
        </details>
      `;

      return element;
    });
    
  }, { async: true });