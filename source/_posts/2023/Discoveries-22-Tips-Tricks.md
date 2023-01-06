---
slug: Discoveries-22-Tips-Tricks
title: 'Discoveries #22 -  Tips/Tricks'
subtitle:
date: 2023-01-06 15:05:55
photograph:
  file: D70_1372.jpg
  name: Black Window
  link: https://500px.com/photo/1022779815/Black-Window-by-Kristof-Zerbe/
  socialmedia: /static/images/social-media/Discoveries-22-Tips-Tricks.png
series: Discoveries
categories:
  - Misc
tags:
  - Collection
related:
  - Generate-Content-from-Trello
  - Discoveries-21-Sites-Pages
  - Discoveries-20-CSS-UI
syndication:
  - host: Mastodon
    url: https://indieweb.social/@kiko/109642996890253172
---

As someone said the other day? "January is the Monday of the year". How true. After programming myself a new workflow for creating my discoveries (see [Generate Content from Trello](/post/Generate-Content-from-Trello/)) at the end of last year, I wanted to try it out again right away and give you a list of tips and tricks for starting 2023.

{% anchorlist 
  "6 steps to get verified on Mastodon with encrypted keys|6-steps-to-get-verified-on-mastodon-with-encrypted-keys"
  "Generate a Pull Request of Static Content With a Simple HTML Form|generate-a-pull-request-of-static-content-with-a-simple-html-form"
  "My Wonderful HTML Email Workflow, using MJML and MDX for responsive emails|my-wonderful-html-email-workflow-using-mjml-and-mdx-for-responsive-emails"
  "How to View Build Logs for GitHub Pages|how-to-view-build-logs-for-github-pages"
  "Enabling IntelliSense for GitHub Actions workflows in VS Code|enabling-intellisense-for-github-actions-workflows-in-vs-code"
  "9 JavaScript Console Tips That Will Improve Your Debugging Skills|9-javascript-console-tips-that-will-improve-your-debugging-skills"
  "Fun with console.log()|fun-with-console-log-"
  "Load hierarchical data from MSSQL with recursive common table expressions|load-hierarchical-data-from-mssql-with-recursive-common-table-expressions"
  "An HTML-first Mental Model|an-html-first-mental-model"
  "Project Documentation with Hexo Static Site Generator|project-documentation-with-hexo-static-site-generator"
%}

<!-- more -->

{% discovery "6 steps to get verified on Mastodon with encrypted keys" "Seth Kenlon" "https://opensource.com/article/22/12/verified-mastodon-pgp-keyoxide" Discoveries-22-Tips-Tricks 6-steps-to-get-verified-on-mastodon-with-encrypted-keys.png %}
To verify that you control your Mastodon account, the easiest way is to add a verification link in your profile, which points to your blog/website and where Mastodon find a link attributed with &#39;rel=me&#39;. For advanced verification you can use the power of shared encrypted keys, which Mastodon can link to thanks to the open source project Keyoxide ... and Seth shows how to get it.
{% enddiscovery %}

{% discovery "Generate a Pull Request of Static Content With a Simple HTML Form" "Hilman Ramadhan" "https://css-tricks.com/generate-a-pull-request-of-static-content-with-a-simple-html-form/" Discoveries-22-Tips-Tricks generate-a-pull-request-of-static-content-with-a-simple-html-form.png %}
Hosting your static files blog/site/whatever on GitHub and wan&#39;t others to contribute? Hilman has an idea to achieve this via a standard form, that creates a Pull Request!
{% enddiscovery %}

{% discovery "My Wonderful HTML Email Workflow, using MJML and MDX for responsive emails" "Josh Comeau" "https://www.joshwcomeau.com/react/wonderful-emails-with-mjml-and-mdx/" Discoveries-22-Tips-Tricks my-wonderful-html-email-workflow-using-mjml-and-mdx-for-responsive-emails.png %}
Writing HTML E-Mails can be challenging, because you can&#39;t use all the modern stuff. For a good reason the technique building mails has stuck in the 90s. Josh&#39;s tutorial is about using the framework MJML (Mailjet Markup Language), which offers an abstraction layer over raw HTML.
{% enddiscovery %}

{% discovery "How to View Build Logs for GitHub Pages" "Rizèl Scarlett" "https://dev.to/github/visualize-github-pages-build-logs-1mc1" Discoveries-22-Tips-Tricks how-to-view-build-logs-for-github-pages.png %}
GitHub Pages are build with Jekyll and as the deployments runs with GitHub Actions it&#39;s easy to view the build details. But more interesting in Rizèl&#39;s article is as he describes a fully custom deployment without Jekyll.
{% enddiscovery %}

{% discovery "Enabling IntelliSense for GitHub Actions workflows in VS Code" "Gérald Barré" "https://www.meziantou.net/enabling-intellisense-for-github-actions-workflows-in-vs-code.htm" Discoveries-22-Tips-Tricks enabling-intellisense-for-github-actions-workflows-in-vs-code.png %}
There are som VS Code Plugins out there, which supports Intellisense while writing workflow YAML files for configuring GitHub Actions. Gérald has a tip how to achieve that manually.
{% enddiscovery %}

{% discovery "9 JavaScript Console Tips That Will Improve Your Debugging Skills" "Sunil Sandhu" "https://blog.bitsrc.io/9-javascript-console-tips-that-will-improve-your-debugging-skills-1899e37469d5" Discoveries-22-Tips-Tricks 9-javascript-console-tips-that-will-improve-your-debugging-skills.png %}
The console is more powerful than you might think. Sunil talks here about the possibilities to debug a bit better and more efficient. I have to use &#39;time&#39; more often...
{% enddiscovery %}

{% discovery "Fun with console.log()" "Alicia Sykes" "https://dev.to/lissy93/fun-with-consolelog-3i59" Discoveries-22-Tips-Tricks fun-with-console-log-.png %}
In addition to Sunils tips above, Alicia summarizes it here and has some more tips for efficient debugging in the browser.
{% enddiscovery %}

{% discovery "Load hierarchical data from MSSQL with recursive common table expressions" "Robert Muehsig" "https://blog.codeinside.eu/2019/03/31/load-hierarchical-data-from-mssql-with-recursive-common-table-expressions/" Discoveries-22-Tips-Tricks load-hierarchical-data-from-mssql-with-recursive-common-table-expressions.png %}
Designing a hierachie inside MS SQL can be painfull, but at least there is a way to load this data in a fast way, as Robert shows.
{% enddiscovery %}

{% discovery "An HTML-first Mental Model" "Noam Rosenthal" "https://calendar.perfplanet.com/2022/an-html-first-mental-model/" Discoveries-22-Tips-Tricks an-html-first-mental-model.png %}
Noam, from Google Chrome&#39;s speed metrics team, writes about his experiences on developing a showcase movies app using different frameworks regarding speed and performance in the browser and why we always keep good old HTML in mind.
{% enddiscovery %}

{% discovery "Project Documentation with Hexo Static Site Generator" "Bruno Mota" "https://www.sitepoint.com/project-documentation-hexo/" Discoveries-22-Tips-Tricks project-documentation-with-hexo-static-site-generator.png %}
Bruno Mota looks at how you can create project documentation using Hexo, the static site generator built on Node.js, and deploy easily to GitHub Pages. Some stuff to learn there for me, who runs this blog nearly the same way...
{% enddiscovery %}

