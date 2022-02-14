---
title: VS Code on the Web
subtitle: Multiple ways to work with Visual Studio Code online
date: 2021-10-22 18:38:29
photograph:
  file: 18-09 Kroatien-0012.jpg
  name: Cabbage & Friends
  link: 'https://500px.com/photo/303732721'
categories:
  - Tools
tags:
  - VS Code
related:
  - GitHubs-Magic-Dot
  - Remote-Testing-and-Debugging-with-Chrome
  - Visualize-the-codebase-of-your-GitHub-repo

---

For most of the years I have been in the IT industry, I have worked with the "fat" Visual Studio from Microsoft. Fat in terms of features, for sure, but also in size and load times. It made no sense to use an other IDE, while developing software with VB.NET/C#. But with the advent of Node.JS JavaScript, so far only known as a scripting language for web pages, outgrew itself and became a serious competitor to established languages.

In 2012 Adobe came out with [Brackets](https://brackets.io/), a lightweight IDE for developing web applications, written with the very same tech stack: HTML, CSS and JavaScript! Based on the [Chromium Embedded Framework](https://en.wikipedia.org/wiki/Chromium_Embedded_Framework), it felt like a normal application! Mind blowing...

In 2015 there was a new kid in town: **[Visual Studio Code](https://code.visualstudio.com) (VS Code)**, of all things from ... Microsoft. During this time, the Redmond-based company had finally jumped on the open source bandwagon and perhaps they saw that Adobe was doing some things right on the IDE market with Brackets (but also some things wrong) and you didn't want to miss the chance to engage the open source community.

The speed with which VS Code passed other IDE's in the developer favor was quite amazing, due to the fact that the source code was openly available on GitHub and the developers in Switzerland released a new version every damn month.

What was exciting for me was the question of how long it would take for someone to make this IDE based on web technology available online, i.e. in a browser. It took until 2021...

<!-- more -->

---

### github.dev and Github Codespaces

In Juli 2021 GitHub announced the availability of **[github.dev]()** and **[GitHub Codespaces](https://github.com/features/codespaces)**. The main difference between these two solutions is that Codespaces runs the IDE within a container (VM) in the background, which enables you to run your project and ... it is only available for paid plans.

The main purpose of github.dev is to serve as a call target of the so-called **Magic Dot**, an easy way to open any repository in an editor. I blogged about this capabilty a while ago, see {% post_link 2021/GitHubs-Magic-Dot %}. Really amazing! Just press the ``dot`` key on every repository and you can browse the code files.

![github.dev](github-dev.jpg)

---

## vscode.dev

Recently, in October 2021, Microsoft (who owns GitHub) announced another online VS Code called **[vscode.dev](https://vscode.dev)**. It is practically the same IDE as github.dev, with one main difference: It is not bound to a GitHub repository, but is able to open any local project or even remote repositories from GitHub.

However, it also has the same limitation that you cannot run a project, because there is no VM running in the background. But it is a really neat online editor, which runs on mobile devices too and feels absolutely like a local installed VS Code.

![vscode.dev](vscode-dev.jpg)

---

## Gitpod

Back in 2017 some developers from Kiel, Germany started a web-based platform called **[Gitpod](gitpod.io)** for providing fully functional orchestrated developer environments in the web. Since at that time VS Code was not yet running in the browser, they started the project [Eclipse Theia](https://theia-ide.org), which powers several online IDE's until today, but  switched to VS Code as the team around Erich Gamma [announced remote development capabilities](code.visualstudio.com/docs/remote/remote-overview) in late 2020.

Whats special about Gitpod is, that users are able to start a browser-based instance of the IDE just by adding the address of an GitHub repository as a parameter to the URL, like ``https://gitpod.io#https://github.com/kristofzerbe/kiko.io``. Gitpot then starts a container with the source code and shows up the IDE at a random URL like ``https://coffee-squirrel-htamfigy.ws-eu18.gitpod.io``.

This so called *Workspaces* can be stopped, resumed, shared and downloaded, because it is a container with everything in it you need to run. Really amazing!

![Gitpod](gitpod-io.jpg)

---

## Other Monaco-driven IDE's

VS Code actually consists of two parts: the platform itself, called [Code-OSS](https://github.com/Microsoft/vscode), and the code editor **[Monaco](https://microsoft.github.io/monaco-editor/)** included in it, which is also available as a separate project and used by other web-based IDE's, like the following...

### Stackblitz

The IDE on **[stackblitz.com](https://stackblitz.com)** is mainly useful for web frontend developers. You can easily create Angular, React, Vue, Next.js, Nuxt or even plain JavaScript or static HTML projects and connect them to an new repository on GitHub. But ... you can't load existing projects from GitHub into Stackblitz on the fly, you have to import them.

What makes Stackblitz very comfortable is that it runs your frontend directly on their servers and gives it to you in a browser-like preview window via a random Url like ``https://web-platform-ywqj4s.stackblitz.io``, you can open up in a separate browser also.

![Stackblitz](stackblitz-com.jpg)

---

### CodeSandbox

**[CodeSandbox](https://codesandbox.io)** works similar to Stackblitz, but offers some more features, like deployment to Vercel, Netlify or GitHub Pages and a test runner. 

Also, you have full control over the sandbox that runs the preview of your project and the ability to invite other developers or visitors to the project, which makes it perfect for online coding seminars e.g. classrooms.

![CodeSandbox](codesandbox-io.jpg)