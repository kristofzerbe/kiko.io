---
title: Using GitHub as Commenting Platform
photograph:
  file: D70_7530.jpg
  name: Untitled
  link: 'https://500px.com/photo/1017605689'
tags:
  - Blogging
  - Hexo
  - GitHub
categories:
  - Tools
date: 2020-07-05 14:55:16
subtitle: Integrate Utteranc's GitHub Issue Commenting to Hexo
---

If you run a blog, it is always advisable to integrate a commenting system, in order to get feedback on your posts from your readers.

So did I, when I start this blog and I decided to use the [Disqus platform](https://disqus.com), as it was very easy to integrate ... but I always had a bad feeling about a third-party platform collecting data from my readers. Disqus is probably not without reason under criticism by many people in the community.

As I host this blog at GitHub (see [A New Blog (Part One): VS Code, Hexo and GitHub Pages](/categories/Tools/A-New-Blog-VS-Code-Hexo-and-GitHub-Pages/)) I was looking for a solution to host the comments also on my prefered platform. There were some solutions, which uses GitHub Issues for this and wanted to implement something like that someday.

<!-- more -->

As I read a post from on [Thomas Lavesques' blog](https://thomaslevesque.com), to solve another problem, his commenting section came to my attention: **[utteranc.es](https://utteranc.es/)** ... exactly the solution I needed! Thanx guys...

On their website is a small configurator for a script to implement in each post, wich needs only few information:

* Name of the Repo
* How the mapping of the post to the Issues should work
* Name of the Theme, in order to fit to the colors of the blog

The script had to be included to my Hexo ``article.js``:

```ejs
<% if (!index && post.comments){ %>
  <script src="https://utteranc.es/client.js"
    repo="kristofzerbe/kiko.io"
    issue-term="pathname"
    theme="github-light"
    crossorigin="anonymous"
    async>
  </script>
<% } %>
```

That's pretty much it. On entering the first comment, utteranc told me to install the needed GitHub App to my repo, in order to make it work ... and done.

![Utteranc GitHub App](Using-GitHub-as-Commenting-Platform/utteranc-github-app.png)

The result you see below ...