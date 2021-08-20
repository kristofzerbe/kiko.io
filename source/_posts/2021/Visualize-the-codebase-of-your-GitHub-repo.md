---
title: Visualize the codebase of your GitHub repo
subtitle: Try GitHub Next's repo-vizualizer action for generating a diagram of your codebase
date: 2021-08-19 15:22:19
hitcountId:
photograph:
  file: D50_0086.jpg
  name: Thomas' Ruby Prince I
  link: 'https://500px.com/photo/1031618817'
categories:
  - Tools
tags:
  - Imaging
  - GitHub
  - Windows
related:
  - GitHubs-Magic-Dot
  - Generate-Social-Media-Images-Automatically
  - Using-GitHub-as-Commenting-Platform
hidden: true
---

Beginning of the month, [Amelia Wattenberger](https://twitter.com/Wattenberger) of [GitHub Next](https://next.github.com/) has published a project to create a SVG visualization of a GitHub repository's codebase.

On the project page **[Visualizing a codebase](https://next.github.com/projects/repo-visualization)**, she talks about the advantages of code vizualization in terms of a better overview and comparability of code ...  and I loved it at first sight, because I'm an absolute visual person.

{% asset_img screenshot-repo-visualization.png "Screenshot from the project page" %}

But her attempt was not only to show us what's possible (static SVG files and even interactive apps for code browsing, filtering and comparing), but give us the possibility to create our own codebase diagrams as SVG automatically, whenever we commit our code, by running a [GitHub Action](https://docs.github.com/en/actions), she and her team has developed ... the **[Repo Vizualizer]**(https://github.com/githubocto/repo-visualizer)

<!-- more -->

Actually, her instructions are quite simple to implement, but the devil is in the details and I would like to show you what you may need for this. The goal is to prepare every project hosted on GitHub with instructions to run the Repo Visualizer after every commit to create or update a SVG file in the project, we can use in the README or via hotlinking in every other web page.

Let's start with my setup:

* Windows 10
* Visual Studio Code
* a bunch of tiny projects hosted on GitHub

## Project Integration

GitHub actions are configured via YAML files in the folder ``.github\workflows``. Therefore we took Amelias demo file ``diagram.yaml`` and copy it to the newly created

```yaml diagram.yml

```

## Prepare Windows

## Parameters

## The README

