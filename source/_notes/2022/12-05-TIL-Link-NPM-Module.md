---
title: "#TIL | Link NPM Module"
date: 2022-12-05 16:55:00
type: til
syndication: 
- host: Mastodon
  url: https://indieweb.social/@kiko/109462482394505029
---

Sometimes it is advisable to outsource functionality into seperate NPM modules. But to avoid having to run ``npm publish`` (module) and ``npm install`` (main project) every time a change in the module takes place, it's relatively easy to include the module's source code directly in the main project:

``npm install /absolute/path/to/the/package``

or to use ``npm link``, which works with global symlinks, but does not save the dependency in package.json.

<!-- more -->

## Related

- [Node.js — How to test your new NPM module without publishing it every 5 minutes](https://medium.com/@oresoftware/node-js-how-to-test-your-new-npm-module-without-publishing-it-every-5-minutes-3b6f8e0491dd)
- [npm-link](https://docs.npmjs.com/cli/v9/commands/npm-link)
