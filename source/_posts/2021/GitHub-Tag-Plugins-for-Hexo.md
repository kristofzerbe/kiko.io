---
title: GitHub Tag Plugins for Hexo
subtitle:
date: 2021-12-29 12:20:34
photograph:
  file: DSC_2443.jpg
  name: Winch
  link: 'https://500px.com/photo/80797993'
project: hexo-tag-plugins
categories:
  - Tools
tags:
  - Hexo
  - Plugin
  - GitHub
related:
  - Hexo-Tag-Plugin-Collection
  - Show-related-posts-in-Hexo
  - Forking-Hexo-plugin-hexo-index-anything
---

Currently I'm working on improving my projects section by linking to some of my projects hosted on Github. One idea is to display the Github README there. Playing around with the GitHub API is fun and so I created two new Hexo Tag Plugins that I don't want to deprive you of and that extend the [Hexo Tag Plugin Collection](https://github.com/kristofzerbe/hexo-tag-plugins).

{% anchorlist
  "GitHub README|readme"
  "GitHub User & Repo Card|user-and-repo-card"
%}

<!-- more -->

{% anchor "readme" HR  %}

## GitHub README

Gets the **README.md** file from a repo and shows it in an expandable ``detail`` tag.

**Usage Example:**

```js
{% github_readme "kristofzerbe" "hexo-tag-plugins" "README for 'hexo-tag-plugins' on GitHub" %}
```

**Live Output:**

{% github_readme "kristofzerbe" "hexo-tag-plugins" "README for 'hexo-tag-plugins' on GitHub" %}

See [https://github.com/kristofzerbe/hexo-tag-plugins#github-readme](https://github.com/kristofzerbe/hexo-tag-plugins#github-readme) for more details.

{% anchor "user-and-repo-card" HR  %}

## GitHub User & Repo Card

Renders a card-like info panel, with full information about a GitHub repo and its creator, the GitHub user.

**Usage Example:**

```js
{% github_user_and_repo_card "kristofzerbe" "hexo-tag-plugins" "500px" %}
```

**Live Output:**

{% github_user_and_repo_card "kristofzerbe" "hexo-tag-plugins" "500px" %}

See [https://github.com/kristofzerbe/hexo-tag-plugins#github-user-and-repo-card](https://github.com/kristofzerbe/hexo-tag-plugins#github-user-and-repo-card) for more details.
