---
slug: Include-and-provide-JSON-data-in-Hexo-EJS-Templates
title: Include and provide JSON data in Hexo EJS Templates
subtitle: ... with a new Helper and an async function
date: 2023-06-27 07:26:21
outdates: never
photograph:
  file: D70_1538.jpg
  name: Smiling Guard
  socialmedia: /static/images/social-media/Include-and-provide-JSON-data-in-Hexo-EJS-Templates.jpg
series: A New Blog
categories:
  - Coding
tags:
  - JavaScript
  - Hexo
  - Templating
related:
  - Show-pages-meta-data-JSON-LD-in-Bottom-Sheet
  - Provide-Blog-Metadata-via-JSON-LD
  - The-State-of-the-Blog
syndication:
  - host: Mastodon
    url: https://indieweb.social/@kiko/110617439442558814
---

The three main components of a standard installation of the Static Site Generator [Hexo](https:\\hexo.io) are the template system [EJS (Embedded JavaScript Templating)](https://ejs.co/), [Markdown](https://en.wikipedia.org/wiki/Markdown) for the content and [Stylus](https://stylus-lang.com/) for the styles.

In the template files are the three main tags for driving content:

**Scriptlet tag for control flow (no output)**

```ejs
<%
  ... my JavaScript code to process data into the template
%>
```

**Output a value as escaped HTML**

```ejs
<%= myVariable %>
```

**Output of a raw value, usually in the form of a JavaScript function**

```ejs
<%- myFunction() %>
```

[Hexo's helper system](https://hexo.io/docs/helpers) is based on the latter. So you can include a JavaScript file in your template that makes use of the [**JS Helper**](https://hexo.io/docs/helpers#js) in ``node_modules\hexo\lib\plugins\helper\js.js`` as follows ...

```js
<%- js('/js/dist/myFancyFunctions.js') %>
```

... which will be rendered to:

```html
<script src="/js/dist//js/dist/qr-code-styling.js"></script>
```

---

## The Problem

So far and short, so good ... but I recently tried to use this way to include a JSON file whose data one of my scripts needed as startup options and I noticed that the above mentioned JS helper unfortunately takes care of the possibly missing file extension ``js``. It doesn't matter if you only pass the path to the file as a string or if all necessary attributes as an object.

<!-- more -->

```js
<%- js({
  src: 'js/dist/script-options.json',
  type: 'application/json'
}) %>
```

This code leads to the following wrong code ...

```html
<script src="/js/dist//js/dist/qr-code-styling.json.js" 
       type="application/json"></script>
```

---

## The JSON Helper

Since Hexo's developers went a bit over my/the target with the helper's functionality, I had to build my own JSON helper, which is actually just a slightly customized copy of the original:

```js themes\landscape\scripts\json-helper.js
const { htmlTag, url_for } = require('hexo-util');

hexo.extend.helper.register('json', function(...args){
  let result = '\n';
  
  args.flat(Infinity).forEach(item => {

    if (typeof item === 'string' || item instanceof String) {
      
      // args = String only
      let path = item;
      if (!path.endsWith('.json')) {
        path += '.json';
      }
      result += `<script src="${url_for.call(this, path)}" type="application/json"></script>\n`;

    } else {

      // args = Object -> Custom Attributes
      item.src = url_for.call(this, item.src);
      item.type = "application/json";
      if (!item.src.endsWith('.json')) item.src += '.json';
      result += htmlTag('script', { ...item }, '') + '\n';
    
    }
  });
  return result;
});
```

You can find the complete file [here](https://github.com/kristofzerbe/kiko.io/blob/master/themes/landscape/scripts/json-helper.js).

With this its possible to reference the JSON like this:

```js
<%- json('js/dist/myOptions.json') %>
```

---

## Bring JSON data to life

However, the helper only allowed me to load the file as such. What was still missing was the loading of the data in the JavaScript of the page itself. The easiest way to achieve that, was to perform a FETCH of the already referenced and loaded file in the SCRIPT block of the template as an immediately invoked async function:

```html EJS File
<%- js('js/dist/myFancyObjectLibrary.js') %>
<%- json({
  src: 'js/dist/myOptions.json', 
  id: 'my-options'
}) %>

<script>
 (async () => {
    const response = await fetch(document.getElementById('my-options').src);
    const options = await response.json();    
    let obj = new myFancyObject(options);
    
    //... do something with the initialized object
    
  })();
</script>
```

Et voilà ... Job done.
