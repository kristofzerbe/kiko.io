---
title: Localization with resource files in JavaScript web apps
subtitle: >-
  How to work with Visual Studio resource files for localization in Single Page
  Applications
date: 2020-06-13 15:49:10
hitcounter: snTaPGHLs
photograph:
  file: '19-05 Israel-0161.jpg'
  name: 'Zern'
  link: 'https://500px.com/photo/1005493426/Zern-by-Kristof-Zerbe'
tags:
  - Visual Studio
  - Resource
  - Localization
  - GitHub
categories:
  - JavaScript
---

There are plenty of editors out there to help you writing JavaScript web applications. As I'm working in my daily life with Visual Studio, it is a obvious choice for me. 

One of the most time saving tools in VS is the plugin [ResXManager](https://marketplace.visualstudio.com/items?itemName=TomEnglert.ResXManager), which is an awesome assistant on managing the translations for a Desktop- or ASP.NET-App, which uses XML-based RESX files.

<!-- more -->

Mostly very localization is based on key/value pairs, defined in separate files for every language provided.

Implementing several languages in pure JavaScript apps is a little more difficult, because it makes no sense to deal with big XML files in JS. All localization libraries in the market uses JSON for storing the translations and it is a little bit of work to find the right one for your requirements.

<!-- more -->

## Localization in JavaScript

For a current project I use  [jquery-lang](https://github.com/Irrelon/jquery-lang-js), because it provides the switch of the apps UI language without reloading and it is easy to implement. Thanks Rob Evans for your work...

The definition of "tokens" in one JSON file for each language is quite easy:

```js ../languages/en.json
{
    "token": {
        "my-test": "My Test in English"
    }
}
```

```js ../languages/de.json
{
    "token": {
        "my-test": "Mein Test in Deutsch"
    }
}
```

The usage also:
```html
<div lang="en" data-lang-token="my-test">
```

## Using RESX and convert to JSON on build

Having this, the most time consuming work is to enter the translations to the localization files. If you have hundreds of them, it is hard to keep the 2, 3 or more language files in sync. You need a helper...

And here comes ResXManager to the rescue, if you work with VS ... but it needs a conversation from RESX to the JSON format jquery-lang uses and this a task, which can be done on building the JS app, by using a task runner like [Grunt](https://gruntjs.com/).

As there was no Grunt plugin/task out there to fit my needs, I have created  **grunt-resource2json** ([GitHub](https://github.com/kristofzerbe/grunt-resource2json), [NPM](https://www.npmjs.com/package/grunt-resource2json)). The configuration in the **gruntfile.js** is like: 

```json gruntfile.js
grunt.initConfig({
    resource2json: {
      convert: {
        options: {
          format: "jquery-lang"
        },
        files: [
          {
            input: "resources/Resource.resx",
            output: "build/langpacks/en.json"
          },
          {
            input: "resources/Resource.de-DE.resx",
            output: "build/langpacks/de.json"
          },
          {
            input: "resources/Resource.es-ES.resx",
            output: "build/langpacks/es.json"
          }
        ]
      }
    });
```

It takes one RESX file (input) and converts it to a JSON file (output) in an array of files.

The heavy work in the plugin is done by the library [xml2js](https://www.npmjs.com/package/xml2js), which transforms the complete XML of the RESX file into a JSON object in one call. All I had to do, was to write all DATA nodes in a loop into the jquery-lang given structure and save it as JSON.

Currently supported is the format for jquery-lang only, but it would be awesome, if you fork the code on [GitHub](https://github.com/kristofzerbe/grunt-resource2json) and send me a Pull Request with the implementation of your needed format.
